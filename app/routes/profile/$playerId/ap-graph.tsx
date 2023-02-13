import { ApGraphPageDocument, ApGraphPageQuery } from "$gql";
import ApGraph from "@/ApGraph.client";
import PageHeader from "@/PageHeader";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { gqlClient } from "~/lib/api/gql";

export const loader: LoaderFunction = async ({ params: { playerId } }) => {
  invariant(playerId);
  return await gqlClient.request(ApGraphPageDocument, { playerId });
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
        image={`avatars/${profile?.playerId}.jpg`}
        navigation={[
          {
            href: `/profile/${profile?.playerId}/overall/scores`,
            label: "Overall",
            isCurrent: false,
          },
          ...(categories?.nodes ?? [])?.map((ncategory) => ({
            href: `/profile/${profile?.playerId}/${ncategory.categoryName}/scores`,
            label: ncategory.categoryDisplayName ?? "",
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
