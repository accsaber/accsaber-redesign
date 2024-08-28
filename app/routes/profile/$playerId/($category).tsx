import type { PlayerLayoutQuery } from "$gql";
import { PlayerLayoutDocument } from "$gql";
import type { Player } from "$interfaces/api/player";
import type CampaignStatus from "$interfaces/campaign/campaignStatus";
import { getImaginaryURL } from "@/CDNImage";
import PlayerHeader from "@/PlayerHeader";
import { defer, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Avatar from "boring-avatars";
import { renderToStaticMarkup } from "react-dom/server";
import invariant from "tiny-invariant";
import config from "~/lib/api/config";
import { getPlayer, json as apiJson } from "~/lib/api/fetcher";
import { gqlClient } from "~/lib/api/gql";
import { withTiming } from "~/lib/timing";
import { metaV1 } from "@remix-run/v1-meta";

export const meta: MetaFunction<typeof loader> = (args) =>
  metaV1(args, {
    title: `${args.data?.profile?.playerName}'s Profile | AccSaber`,
    description: `
  Rank: #${args.data?.profile?.rank}
  AP: ${args.data?.profile?.ap.toLocaleString(config.defaultLocale, {
    maximumFractionDigits: 2,
  })}
  ${args.data?.profile?.rankedPlays.toLocaleString(
    config.defaultLocale
  )} Ranked Plays
  ${args.data?.profile?.hmd}`
      .trim()
      .replace(/\n +/g, "\n"),
    "og:image": args.data?.profile?.playerId.startsWith("7")
      ? getImaginaryURL(
          {
            width: 256,
            height: 256,
            src: `avatars/${args.data?.profile?.playerId}.jpg`,
          },
          "jpeg"
        ).toString()
      : `/api/avatar/${args.data?.profile?.playerId}`,
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
    : `data:image/svg+xml;base64,${
        playerId
          ? Buffer.from(
              renderToStaticMarkup(
                <Avatar name={playerId} variant="beam" square />
              )
            ).toString("base64")
          : ""
      }`;

export const loader = async ({
  params: { playerId, category = "overall" },
  request: { url },
}: LoaderFunctionArgs) => {
  invariant(playerId, "Missing Player Id");
  // This is the stupidest bug I have ever fixed
  if (category == "scores")
    throw new Response("Profile not found", { status: 404 });
  const headers = new Headers();
  headers.append("Cache-Control", "max-age=60, stale-while-revalidate=6400");

  const { searchParams } = new URL(url);

  const historyDays = Math.max(
    parseInt(searchParams.get("historyDays")!) || 30,
    1
  );

  const categoryNumber =
    category === "overall"
      ? -1
      : ["true", "standard", "tech"].indexOf(category) + 1;

  const [profile, queryData, blurData, campaignStatus] = await Promise.all([
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
        historyDays,
      })
      .then(withTiming(headers, "query", "GraphQL Query")),
    getPlayerImage(playerId),
    apiJson<CampaignStatus[]>(
      new URL(`0/player-campaign-infos/${playerId}`, config.campaignsURL)
    ).then(withTiming(headers, "fetch", "Get Campaign Level")),
  ]);

  if (!profile) throw new Response("Profile not found", { status: 404 });

  const peakRank =
    queryData.playerPeakRanks?.nodes[0]?.peakRanking ?? undefined;

  return json(
    {
      playerId: profile.playerId,
      profile,
      campaignStatus,
      queryData,
      category,
      peakRank,
      blurData,
    },
    { headers }
  );
};
export default function PlayerLayout() {
  const {
    campaignStatus,
    category,
    profile,
    queryData,
    playerId,
    blurData,
    peakRank,
  } = useLoaderData<typeof loader>();

  return (
    <main>
      <PlayerHeader
        category={category}
        profile={profile}
        playerId={playerId}
        peakRank={peakRank}
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
