import Image from "next/image";
import Link from "next/link";
import { Suspense, use } from "react";
import PlayerName from "./PlayerName";
import RankGraph from "./RankGraph";
import { language } from "~/lib/api/config";
import { getPlayer, json } from "~/lib/api/fetcher";
import { getSkills } from "~/lib/api/skills";
import { Category } from "~/lib/interfaces/api/category";
import RankGraphContainer from "./RankGraphContainer";
import getCampaignStatus, { getHighestLevel } from "~/lib/api/campaign";
import PageHeader from "~/app/Components/PageHeader";
import LoadingSpinner from "~/app/Components/LoadingSpinner";
import SkillsContainer from "./SkillsContainer";
import Title from "~/app/Components/Title";
import { notFound } from "next/navigation";

export default function PlayerHeader({
  playerId,
  category = "overall",
}: {
  playerId: string;
  category: string;
}) {
  const profile = use(
    getPlayer(playerId, category).catch((error) => {
      throw notFound();
    })
  );
  const campaignStatus = use(getCampaignStatus(playerId));
  const categories = use(json<Category[]>("categories"));

  return (
    <>
      <PageHeader
        transparent
        image={profile.avatarUrl}
        navigation={[
          {
            href: `/profile/${profile.playerId}/overall/scores`,
            label: `Overall`,
            isCurrent: category == "overall",
          },
          ...categories.map((ncategory) => ({
            href: `/profile/${profile.playerId}/${ncategory.categoryName}/scores`,
            label: ncategory.categoryDisplayName,
            isCurrent: category == ncategory.categoryName,
          })),
        ]}
      >
        {profile.playerName}&apos;s Profile
      </PageHeader>
      <Title>{`${profile.playerName}'s Profile`}</Title>
      <div className="relative overflow-hidden bg-neutral-100 dark:bg-black/20">
        <div className="h-16" />
        <Image
          src={profile.avatarUrl}
          className="absolute top-0 left-0 object-cover w-full h-full opacity-20 blur-3xl"
          alt=""
          width={184}
          height={184}
        />
        <div
          className={[
            "flex gap-6 py-4 text-neutral-800 dark:text-neutral-200 items-center",
            "max-w-screen-lg mx-auto px-4 flex-wrap justify-center relative",
          ].join(" ")}
        >
          <Image
            src={profile.avatarUrl}
            alt={`${profile.playerName}'s profile`}
            width={128}
            height={128}
            className={[
              "w-32 h-32 rounded-full shadow-lg",
              campaignStatus && campaignStatus.length > 0 ? "border-4" : "",
              [
                "border-[#3498db] shadow-[#3498db]/50",
                "border-[#f1c40f] shadow-[#f1c40f]/50",
                "border-[#1abc9c] shadow-[#1abc9c]/50",
                "border-[#9c59b6] shadow-[#9c59b6]/50",
              ][getHighestLevel(campaignStatus ?? [])],
            ].join(" ")}
          />

          <div className="flex flex-col justify-center flex-1">
            <div className="">
              <h1 className="text-2xl font-semibold">
                <Suspense>
                  <PlayerName>{profile}</PlayerName>
                </Suspense>
              </h1>
              <div className="flex flex-1 gap-1 text-2xl">
                <div>
                  <Link
                    href={`/leaderboards/${category}?page=${
                      Math.floor(profile.rank / 50) + 1
                    }`}
                  >
                    #{profile.rank.toLocaleString(language)}
                  </Link>
                </div>

                {profile.rankLastWeek !== profile.rank ? (
                  <div
                    className={[
                      profile.rankLastWeek > profile.rank
                        ? "text-green-600 dark:text-green-400"
                        : "",
                      profile.rankLastWeek < profile.rank
                        ? "text-red-600 dark:text-red-400"
                        : "",
                    ]
                      .join(" ")
                      .trim()}
                  >
                    {profile.rankLastWeek > profile.rank ? "+" : ""}
                    {profile.rankLastWeek - profile.rank}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="text-xl">
              {profile.ap.toLocaleString(language, {
                maximumFractionDigits: 2,
              })}{" "}
              AP
            </div>
            <div className="text-xl">{profile.rankedPlays} ranked plays</div>
            <div className="text-xl">{profile.hmd}</div>
          </div>
          <div className="w-72 h-72">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full dark:text-neutral-100">
                  <LoadingSpinner />
                </div>
              }
            >
              <SkillsContainer playerId={playerId} />
            </Suspense>
          </div>
        </div>
        <div className="relative h-64 max-w-screen-lg px-8 pb-12 mx-auto">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full dark:text-neutral-100">
                <LoadingSpinner />
              </div>
            }
          >
            <RankGraphContainer playerId={playerId} category={category} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
