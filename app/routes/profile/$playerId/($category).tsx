import type { PlayerLayoutQuery } from "$gql";
import { PlayerLayoutDocument } from "$gql";
import type { Player } from "$interfaces/api/player";
import type CampaignStatus from "$interfaces/campaign/campaignStatus";
import PlayerHeader from "@/PlayerHeader";
import type { LoaderArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getPlayer } from "~/lib/api/fetcher";
import { gqlClient } from "~/lib/api/gql";
import { withTiming } from "~/lib/timing";

interface PlayerLayoutData {
  playerId: string;
  profile: Player;
  campaignStatus: CampaignStatus[];
  queryData: PlayerLayoutQuery;
  category: string;
}

export const meta: MetaFunction = ({ data }: { data: PlayerLayoutData }) => ({
  title: `${data?.profile?.playerName}'s Profile | AccSaber`,
});

const getPlayerImage = (playerId: string) =>
  playerId.startsWith("7")
    ? fetch(
        `https://cdn.accsaber.com/imaginary/crop?file=%2Favatars%2F${encodeURIComponent(
          playerId.toString()
        )}.jpg&width=33&height=13&type=webp`
      ).then((res) => res.arrayBuffer())
    : null;

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

  return json(
    {
      playerId: profile.playerId,
      profile,
      campaignStatus: queryData.campaign?.playerCampaignInfo,
      queryData,
      category,
      blurData: blurData
        ? `data:image/webp;base64,${Buffer.from(blurData).toString("base64")}`
        : null,
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
        campaignStatus={campaignStatus as CampaignStatus[]}
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
