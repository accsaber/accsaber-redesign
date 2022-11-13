"use client";

import invariant from "tiny-invariant";
import { use } from "react";
import { getPlayer, json } from "~/lib/api/fetcher";
import { Category } from "~/lib/interfaces/api/category";
import { PlayerScore } from "~/lib/interfaces/api/player-score";
import ApGraph from "../Components/ApGraph";
import PageHeader from "~/app/Components/PageHeader";
import { notFound } from "next/navigation";

export default function ApGraphPage({
  params,
  searchParams,
}: {
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
}) {
  invariant(params?.playerId, "Missing player id parameter");
  const [profile, categories] = use(
    Promise.all([
      getPlayer(params.playerId).catch((error) => {
        throw notFound();
      }),
      json<Category[]>("categories"),
    ])
  );

  const categoryScores = use(
    Promise.all(
      categories.map((category) =>
        json<PlayerScore[]>(
          `players/${params.playerId}/${category.categoryName}/scores`
        ).then((scores) => ({ ...category, scores }))
      )
    )
  );

  return (
    <>
      <PageHeader
        image={profile.avatarUrl}
        navigation={[
          {
            href: `/profile/${profile.playerId}/overall/scores`,
            label: `Overall`,
            isCurrent: false,
          },
          ...categories.map((ncategory) => ({
            href: `/profile/${profile.playerId}/${ncategory.categoryName}/scores`,
            label: ncategory.categoryDisplayName,
            isCurrent: false,
          })),
          {
            href: `/profile/${profile.playerId}/ap-graph`,
            label: "AP Graph",
            isCurrent: true,
          },
        ]}
      >
        {profile.playerName}&apos;s Profile
      </PageHeader>

      <div className="w-full max-w-screen-lg p-6 mx-auto h-[32rem] flex-1">
        <ApGraph data={categoryScores} />
      </div>
    </>
  );
}
