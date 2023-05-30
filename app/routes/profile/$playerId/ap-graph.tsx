import type { ApGraphPageQuery } from "$gql";
import { ApGraphPageDocument } from "$gql";
import ApGraph from "@/ApGraph.client";
import PlayerAvatar from "@/PlayerAvatar";
import PageHeader from "@/PageHeader";
import type { LoaderArgs, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { gqlClient } from "~/lib/api/gql";

export const loader = async ({ params: { playerId } }: LoaderArgs) => {
  invariant(playerId);
  return await gqlClient.request(ApGraphPageDocument, { playerId });
};

export const meta: MetaFunction<typeof loader> = (p) => ({
  title: `${p.data.playerDatum?.playerName}'s AP Graph | AccSaber`,
});

export default function ApGraphPage() {
  const {
    categories,
    accSaberScores,
    categoryAccSaberPlayers,
    playerDatum: profile,
  } = useLoaderData<ApGraphPageQuery>();
  return (
    <>
      <PageHeader
        image={
          profile?.playerId && profile.playerName ? (
            <PlayerAvatar
              className={"w-8 h-8 rounded-full relative overflow-hidden"}
              profile={{
                playerId: profile.playerId,
                playerName: profile.playerName,
              }}
            />
          ) : undefined
        }
        navigation={[
          {
            href: `/profile/${profile?.playerId}/overall`,
            label: "Overall",
            isCurrent: false,
          },
          ...(categoryAccSaberPlayers?.nodes?.filter(Boolean) ?? []).map(
            (node) => ({
              href: `/profile/${profile?.playerId}/${node.categoryName}`,
              label: <span className="capitalize">{node.categoryName}</span>,
              isCurrent: false,
            })
          ),
          {
            href: `/profile/${profile?.playerId}/ap-graph`,
            label: "AP Graph",
            isCurrent: true,
          },
        ]}
      >
        {profile?.playerName}&apos;s Profile
      </PageHeader>

      <div className="w-full max-w-screen-lg p-6 mx-auto h-[32rem] flex-1">
        <ApGraph
          data={accSaberScores?.nodes ?? []}
          categories={
            (categories?.nodes as {
              categoryName: string;
              categoryDisplayName: string;
            }[]) ?? []
          }
        />
      </div>
    </>
  );
}
