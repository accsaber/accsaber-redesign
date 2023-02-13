import { PlayerLayoutDocument, PlayerLayoutQuery } from "$gql";
import { Player } from "$interfaces/api/player";
import CampaignStatus from "$interfaces/campaign/campaignStatus";
import PlayerHeader from "@/PlayerHeader";
import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import getCampaignStatus from "~/lib/api/campaign";
import { getPlayer } from "~/lib/api/fetcher";
import { gqlClient } from "~/lib/api/gql";

interface PlayerLayoutData {
  playerId: string;
  profile: Player;
  campaignStatus: CampaignStatus[];
  queryData: PlayerLayoutQuery;
  category: string;
}

export const loader: LoaderFunction = async ({
  params: { playerId, category = "overall" },
}) => {
  invariant(playerId, "Missing Player Id");

  const categoryNumber =
    category === "overall"
      ? -1
      : ["true", "standard", "tech"].indexOf(category) + 1;

  const [profile, campaignStatus, queryData] = await Promise.all([
    getPlayer(playerId, category).catch(() => {
      throw new Response("Player not found", {
        status: 404,
        statusText: "Player not found",
      });
    }),
    getCampaignStatus(playerId),
    gqlClient.request(PlayerLayoutDocument, {
      playerId,
      category: categoryNumber,
    }),
  ]);

  return json({
    playerId,
    profile,
    campaignStatus,
    queryData,
    category,
  });
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
