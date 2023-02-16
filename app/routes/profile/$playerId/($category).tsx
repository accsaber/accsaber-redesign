import type { PlayerLayoutQuery } from "$gql";
import { PlayerLayoutDocument } from "$gql";
import type { Player } from "$interfaces/api/player";
import type CampaignStatus from "$interfaces/campaign/campaignStatus";
import PlayerHeader from "@/PlayerHeader";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import getCampaignStatus from "~/lib/api/campaign";
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

export const loader: LoaderFunction = async ({
  params: { playerId, category = "overall" },
}) => {
  invariant(playerId, "Missing Player Id");
  // This is the stupidest bug I have ever fixed
  if (category == "scores")
    throw new Response("Profile not found", { status: 404 });
  const headers = new Headers();

  const categoryNumber =
    category === "overall"
      ? -1
      : ["true", "standard", "tech"].indexOf(category) + 1;

  const [profile, queryData] = await Promise.all([
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
  ]);

  if (!profile) return new Response("Profile not found", { status: 404 });

  return json(
    {
      playerId: profile.playerId,
      profile,
      campaignStatus: queryData.campaign?.playerCampaignInfo,
      queryData,
      category,
    },
    { headers }
  );
};
export default function PlayerLayout() {
  const { campaignStatus, category, profile, queryData, playerId } =
    useLoaderData<PlayerLayoutData>();

  return (
    <main>
      <PlayerHeader
        category={category}
        profile={profile}
        playerId={playerId}
        campaignStatus={campaignStatus}
        // @ts-ignore
        queryData={queryData}
      />
      <div className="relative max-w-screen-lg py-8 mx-auto">
        <Outlet />
      </div>
    </main>
  );
}
