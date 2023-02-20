import type { ApGraphPageQuery } from "$gql";
import { ApGraphPageDocument } from "$gql";
import ApGraph from "@/ApGraph.client";
import PlayerAvatar from "@/PlayerAvatar";
import PageHeader from "@/PageHeader";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { gqlClient } from "~/lib/api/gql";

export const loader: LoaderFunction = async ({ params: { playerId } }) => {
  invariant(playerId);
  const headers = new Headers();
  headers.append("Cache-Control", "max-age=60, stale-while-revalidate=6400");
  return json(await gqlClient.request(ApGraphPageDocument, { playerId }), {
    headers,
  });
};

export default function ApGraphPage() {
  const {
    categories,
    accSaberScores,
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
          ...(categories?.nodes ?? [])?.map((ncategory) => ({
            href: `/profile/${profile?.playerId}/${ncategory.categoryName}`,
            label: ncategory.categoryDisplayName?.split(/\b/g)[0] ?? "" ?? "",
            isCurrent: false,
          })),
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
