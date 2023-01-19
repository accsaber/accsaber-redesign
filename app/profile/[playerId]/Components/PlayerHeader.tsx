import Link from "next/link";
import { Suspense, use } from "react";
import PlayerName from "./PlayerName";
import { language } from "~/lib/api/config";
import { getPlayer } from "~/lib/api/fetcher";
import getCampaignStatus, { getHighestLevel } from "~/lib/api/campaign";
import PageHeader from "~/app/Components/PageHeader";
import LoadingSpinner from "~/app/Components/LoadingSpinner";
import Title from "~/app/Components/Title";
import { notFound } from "next/navigation";
import CDNImage from "~/app/Components/CDNImage";
import { sdk } from "~/lib/api/gql";
import dynamic from "next/dynamic";
import Avatar from "boring-avatars";
import BlankBlock from "@/BlankBlock";

const SkillTriangle = dynamic(() => import("./SkillTriangle"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const RankGraph = dynamic(() => import("./RankGraph"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function PlayerHeader({
  playerId,
  category = "overall",
}: {
  playerId: string;
  category: string;
}) {
  const [profile, campaignStatus] = use(
    Promise.all([
      getPlayer(playerId, category).catch((error) => {
        throw notFound();
      }),
      getCampaignStatus(playerId),
    ])
  );
  const categoryNumber =
    category === "overall"
      ? -1
      : ["true", "standard", "tech"].indexOf(category) + 1;
  const {
    playerRankHistories,
    categories: categoriesEdge,
    categoryAccSaberPlayers: categoryStats,
  } = use(sdk.PlayerLayout({ playerId, category: categoryNumber }));

  const categories = categoriesEdge?.nodes ?? [];

  const highestLevel = getHighestLevel(campaignStatus ?? []);
  const AvImage = playerId.startsWith("7") ? CDNImage : "img";

  const avatar = profile.playerId.startsWith("7")
    ? `avatars/${profile.playerId}.jpg`
    : `/api/avatar/${profile.playerId}`;
  return (
    <>
      <PageHeader
        transparent
        cdn={playerId.startsWith("7")}
        image={avatar}
        navigation={[
          {
            href: `/profile/${profile.playerId}/overall/scores`,
            label: "Overall",
            isCurrent: category === "overall",
          },
          ...categories.map((node) => ({
            href: `/profile/${profile.playerId}/${node.categoryName}/scores`,
            label: node.categoryDisplayName ?? "",
            isCurrent: category === node.categoryName,
          })),
          {
            href: `/profile/${profile.playerId}/ap-graph`,
            label: "AP Graph",
            isCurrent: false,
          },
        ]}
      >
        {profile.playerName}&apos;s Profile
      </PageHeader>
      <Title>{`${profile.playerName}'s Profile`}</Title>
      <div className="relative overflow-hidden bg-neutral-100 dark:bg-black/20 text-neutral-800 dark:text-neutral-200">
        <div className="h-16" />
        <AvImage
          src={`${avatar}?variant=marble`}
          className={`absolute top-0 left-0 object-cover w-full h-full opacity-20 ${
            !profile.playerId.startsWith("7") ? "" : "blur-3xl"
          }`}
          alt=""
          width={184}
          height={184}
        />
        <div
          className={[
            "flex gap-6 p-8 md:p-4 items-center",
            "max-w-screen-lg mx-auto flex-wrap justify-center relative",
          ].join(" ")}
        >
          <div
            className={[
              "w-32 h-32 rounded-full shadow-lg relative overflow-hidden border-4",
              [
                "border-[#3498db] shadow-[#3498db]/50",
                "border-[#f1c40f] shadow-[#f1c40f]/50",
                "border-[#1abc9c] shadow-[#1abc9c]/50",
                "border-[#9c59b6] shadow-[#9c59b6]/50",
              ][highestLevel] ?? "border-neutral-400 dark:border-neutral-600",
            ].join(" ")}
          >
            <div className="absolute top-0 left-0 w-full h-full">
              <Avatar
                size={128}
                square
                variant="beam"
                name={profile.playerId}
              />
            </div>

            {profile.playerId.startsWith("7") && (
              <AvImage
                src={avatar}
                alt={`${profile.playerName}'s profile`}
                width={128}
                height={128}
                className="absolute top-0 left-0 z-10 w-full h-full"
              />
            )}
          </div>

          <div className="flex flex-col justify-center flex-1">
            <div className="">
              <h1 className="text-2xl font-semibold">
                <PlayerName highestLevel={highestLevel}>{profile}</PlayerName>
              </h1>
              <div className="flex flex-1 gap-1 text-2xl">
                <div>
                  <Link
                    prefetch={false}
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
            <div className="text-xl min-w-max">
              {profile.rankedPlays} ranked plays
            </div>
            <div className="text-xl">{profile.hmd}</div>
          </div>
          <div className="flex items-center justify-center w-72 h-72">
            <Suspense fallback={<LoadingSpinner />}>
              <SkillTriangle categories={categories} key="skills">
                {categoryStats?.nodes ?? []}
              </SkillTriangle>
            </Suspense>
          </div>
        </div>
        <div className="relative flex items-center justify-center h-64 max-w-screen-lg px-8 pb-12 mx-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <RankGraph history={playerRankHistories?.nodes ?? []} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export function PlayerHeaderFallback({ playerId }: { playerId: string }) {
  return (
    <>
      <PageHeader transparent image={`/api/avatar/${playerId}`} cdn={false}>
        <BlankBlock width="170px" />
      </PageHeader>
      <div className="relative overflow-hidden bg-neutral-100 dark:bg-black/20 text-neutral-800 dark:text-neutral-200">
        <div className="h-16" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/api/avatar/${playerId}?variant=marble`}
          className={`absolute top-0 left-0 object-cover w-full h-full opacity-20`}
          alt=""
          width={184}
          height={184}
        />
        <div
          className={[
            "flex gap-6 p-8 md:p-4 items-center",
            "max-w-screen-lg mx-auto flex-wrap justify-center relative",
          ].join(" ")}
        >
          <div className="relative w-32 h-32 overflow-hidden border-4 rounded-full shadow-lg border-neutral-400 dark:border-neutral-400">
            <Avatar size={128} square variant="beam" name={playerId} />
          </div>

          <div className="flex flex-col justify-center flex-1">
            <div className="">
              <h1 className="text-2xl font-semibold">
                <BlankBlock width="200px" />
              </h1>
              <div className="flex flex-1 gap-1 text-2xl">
                <BlankBlock width="30px" />
              </div>
            </div>
            <div className="text-xl">
              <BlankBlock width="120px" />
            </div>
            <div className="text-xl min-w-max">
              <BlankBlock width="150px" />
            </div>
            <div className="text-xl">
              <BlankBlock width="120px" />
            </div>
          </div>
          <div className="flex items-center justify-center w-72 h-72">
            <LoadingSpinner />
          </div>
        </div>
        <div className="relative flex items-center justify-center h-64 max-w-screen-lg px-8 pb-12 mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    </>
  );
}
