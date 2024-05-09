import type { PlayerLayoutQuery } from "$gql";
import { PlayerLayoutDocument } from "$gql";
import type { Player } from "$interfaces/api/player";
import type CampaignStatus from "$interfaces/campaign/campaignStatus";
import { getImaginaryURL } from "@/CDNImage";
import PlayerHeader from "@/PlayerHeader";
import { defer, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Avatar from "boring-avatars";
import { renderToStaticMarkup } from "react-dom/server";
import invariant from "tiny-invariant";
import config from "~/lib/api/config";
import { getPlayer, json as apiJson } from "~/lib/api/fetcher";
import { gqlClient } from "~/lib/api/gql";
import { withTiming } from "~/lib/timing";

export const meta: MetaFunction<typeof loader> = ({ data: { profile } }) => ({
  title: `${profile.playerName}'s Profile | AccSaber`,
  description: `
  Rank: #${profile.rank}
  AP: ${profile.ap.toLocaleString(config.defaultLocale, {
    maximumFractionDigits: 2,
  })}
  ${profile.rankedPlays.toLocaleString(config.defaultLocale)} Ranked Plays
  ${profile.hmd}`
    .trim()
    .replace(/\n +/g, "\n"),
  "og:image": profile.playerId.startsWith("7")
    ? getImaginaryURL(
        {
          width: 256,
          height: 256,
          src: `avatars/${profile.playerId}.jpg`,
        },
        "jpeg"
      ).toString()
    : `/api/avatar/${profile.playerId}`,
});

const getPlayerImage = async (playerId: string) =>
  playerId.startsWith("7")
    ? `data:image/webp;base64,${Buffer.from(
        await fetch(
          getImaginaryURL({
            src: `avatars/${playerId}.jpg`,
            width: 32,
            height: 32,
          })
        ).then((res) => res.arrayBuffer())
      ).toString("base64")}`
    : `data:image/svg+xml;base64,${Buffer.from(
        renderToStaticMarkup(<Avatar name={playerId} variant="beam" square />)
      ).toString("base64")}`;

export const loader = async ({
  params: { playerId, category = "overall" },
}: LoaderArgs) => {
  invariant(playerId, "Missing Player Id");
  // This is the stupidest bug I have ever fixed
  if (category == "scores")
    throw new Response("Profile not found", { status: 404 });
  const headers = new Headers();
  headers.append("Cache-Control", "max-age=60, stale-while-revalidate=6400");

  const categoryNumber =
    category === "overall"
      ? -1
      : ["true", "standard", "tech"].indexOf(category) + 1;

  const [profile, queryData, blurData] = await Promise.all([
    getPlayer(playerId, category)
      .then(withTiming(headers, "fetch", "Get Player"))
      .catch(() => {
        throw new Response("Player not found", {
          status: 404,
          statusText: "Player not found",
        });
      }),
    gqlClient
      .request(PlayerLayoutDocument, {
        playerId,
        category: categoryNumber,
      })
      .then(withTiming(headers, "query", "GraphQL Query")),
    getPlayerImage(playerId),
  ]);

  if (!profile) throw new Response("Profile not found", { status: 404 });

  return defer(
    {
      playerId: profile.playerId,
      profile,
      campaignStatus: apiJson(
        new URL(`0/player-campaign-infos/${playerId}`, config.campaignsURL)
      ),
      queryData,
      category,
      blurData,
    },
    { headers }
  );
};
export default function PlayerLayout() {
  const { campaignStatus, category, profile, queryData, playerId, blurData } =
    useLoaderData<typeof loader>();

  return (
    <main>
      <PlayerHeader
        category={category}
        profile={profile}
        playerId={playerId}
        campaignStatus={campaignStatus}
        // @ts-ignore
        queryData={queryData}
        miniblur={blurData ?? undefined}
      />
      <div className="relative max-w-screen-lg py-8 mx-auto">
        <Outlet />
      </div>
    </main>
  );
}
