import Link from "next/link";
import { Suspense, lazy } from "react";
import PlayerName from "./PlayerName";
import { language } from "~/lib/api/config";
import { getHighestLevel } from "~/lib/api/campaign";
import PageHeader from "@/PageHeader";
import LoadingSpinner from "@/LoadingSpinner";
import CDNImage from "@/CDNImage";
import Avatar from "boring-avatars";
import BlankBlock from "@/BlankBlock";
import type { Player } from "$interfaces/api/player";
import type CampaignStatus from "$interfaces/campaign/campaignStatus";
import type { PlayerLayoutQuery } from "~/__generated__/gql";
import { Form } from "@remix-run/react";
import scoresaberLogo from "~/images/scoresaber.svg";
import { useUser } from "./UserContext";
import { UserAddIcon } from "@heroicons/react/outline";
import PlayerAvatar from "./Avatar";

const SkillTriangle = lazy(() => import("@/SkillTriangle"));
const RankGraph = lazy(() => import("@/RankGraph"));

export default function PlayerHeader({
  playerId,
  category = "overall",
  profile,
  campaignStatus,
  queryData: {
    playerRankHistories,
    categories: categoriesEdge,
    categoryAccSaberPlayers: categoryStats,
  },
}: {
  playerId: string;
  category: string;
  profile: Player;
  campaignStatus: CampaignStatus[];
  queryData: PlayerLayoutQuery;
}) {
  const categories = categoriesEdge?.nodes ?? [];

  const user = useUser();

  const highestLevel = getHighestLevel(campaignStatus ?? []);
  const AvImage = playerId.startsWith("7") ? CDNImage : "img";

  const avatar = profile.playerId.startsWith("7")
    ? `avatars/${profile.playerId}.jpg`
    : `/api/avatar/${profile.playerId}`;
  return (
    <>
      <PageHeader
        transparent
        image={
          <PlayerAvatar
            className={"w-8 h-8 rounded-full relative overflow-hidden"}
            profile={profile}
          />
        }
        actionButton={
          <div className="flex flex-row-reverse gap-2">
            <a
              href={`https://scoresaber.com/u/${profile.playerId}`}
              className="block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              <img
                src={scoresaberLogo}
                alt="Profile on ScoreSaber"
                className="h-6"
              />
            </a>
            {user?.playerId !== profile.playerId ? (
              <Form
                action={`/settings/login`}
                method="post"
                replace
                reloadDocument
              >
                <button
                  type="submit"
                  name="userId"
                  value={profile.playerId}
                  className="block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  title="Set as my profile"
                  aria-label="Set as my profile"
                >
                  <UserAddIcon className="w-6 h-6" />
                </button>
              </Form>
            ) : undefined}
          </div>
        }
        navigation={[
          {
            href: `/profile/${profile.playerId}/overall/scores`,
            label: "Overall",
            isCurrent: category === "overall",
          },
          ...categories.map((node) => ({
            href: `/profile/${profile.playerId}/${node.categoryName}/scores`,
            label: node.categoryDisplayName?.split(/\b/g)[0] ?? "",
            isCurrent: category === node.categoryName,
          })),
          {
            href: `/profile/${profile.playerId}/ap-graph`,
            label: "AP Graph",
            isCurrent: false,
          },
        ]}
      >
        <div className="max-w-[15ch] overflow-hidden text-ellipsis whitespace-nowrap">
          {profile.playerName}&apos;s Profile
        </div>
      </PageHeader>
      <div className="relative overflow-hidden bg-neutral-100 dark:bg-black/20 text-neutral-800 dark:text-neutral-200">
        <div className="h-16" />
        <PlayerAvatar
          className={`absolute top-0 left-0 object-cover w-full h-full opacity-20 ${
            !profile.playerId.startsWith("7") ? "" : "blur-3xl"
          }`}
          profile={profile}
          variant="marble"
        />
        <div
          className={[
            "flex gap-6 p-8 md:p-4 items-center",
            "max-w-screen-lg mx-auto flex-wrap justify-center relative",
          ].join(" ")}
        >
          <PlayerAvatar
            className={[
              "w-36 h-36 rounded-2xl shadow-lg relative overflow-hidden border-4",
              [
                "border-[#3498db] shadow-[#3498db]/50",
                "border-[#f1c40f] shadow-[#f1c40f]/50",
                "border-[#1abc9c] shadow-[#1abc9c]/50",
                "border-[#9c59b6] shadow-[#9c59b6]/50",
              ][highestLevel] ?? "border-neutral-400 dark:border-neutral-600",
            ].join(" ")}
            profile={profile}
          />
          <div className="flex flex-col justify-center flex-1">
            <div className="">
              <h1 className="text-2xl font-semibold">
                <PlayerName highestLevel={highestLevel}>{profile}</PlayerName>
              </h1>
              <div className="flex flex-1 gap-1 text-2xl">
                <div>
                  <Link
                    prefetch={"none"}
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
              <SkillTriangle
                categories={categories}
                key="skills"
                skills={categoryStats?.nodes ?? []}
              />
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
            <Avatar size={120} square variant="beam" name={playerId} />
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
