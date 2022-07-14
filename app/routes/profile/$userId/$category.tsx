import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useCatch, useLoaderData } from "@remix-run/react";
import { AxiosError } from "axios";
import invariant from "tiny-invariant";
import { getCategories } from "~/lib/api/category";
import { language } from "~/lib/api/config";
import {
  getPlayer,
  getPlayerCampaignLevel,
  getPlayerRankHistory,
} from "~/lib/api/player";
import RankGraph from "~/lib/components/rankGraph";
import SkillTriangle from "~/lib/components/skillTriangle";
import type { Category } from "~/lib/interfaces/api/category";
import type { Player } from "~/lib/interfaces/api/player";
import { getSkills } from "~/lib/components/skillTriangle";
import type { CatchBoundaryComponent } from "@remix-run/react/routeModules";
import PlayerName, { getHighestLevel } from "~/lib/components/playerName";
import type CampaignStatus from "~/lib/interfaces/campaign/campaignStatus";

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();
  return (
    <div className="w-full max-w-screen-lg px-4 py-8 mx-auto prose prose-xl dark:prose-invert">
      {caught.status === 404 ? (
        <>
          <h1 className="text-orange-600 dark:text-orange-400">
            Profile not found
          </h1>
          <p>
            Looks like this player hasn't played anything from this category.
          </p>
        </>
      ) : (
        <p>
          <h1 className="text-red-600 dark:text-red-400">Error loading page</h1>
          <p>It looks like something's gone wrong.</p>
          <p>
            This website is still in development, and there's likely to be a few
            things broken
          </p>
          <p>
            If you've set this off with something obscure, let a dev know and
            we'll throw it on the pile
          </p>
          <p>
            If it's something really obvious, please don't, we probably already
            know {":)"}
          </p>
        </p>
      )}
    </div>
  );
};

export const meta: MetaFunction = ({
  data,
}: {
  data?: { profile?: Player };
}) => ({
  title: `${
    data?.profile?.playerName ?? "Unknown Player"
  }'s Profile | AccSaber`,
  "og:title": `${data?.profile?.playerName ?? "Unknown Player"}'s Profile`,
  "og:description": `Rank#${
    data?.profile?.rank
  }\nAP: ${data?.profile?.ap.toFixed(2)}\n`,
  description: `Rank #${data?.profile?.rank}\nAP: ${data?.profile?.ap.toFixed(
    2
  )}\n`,
  "og:image:url": `/profile/${data?.profile?.playerId}.avatar.webp`,
  "og:image:width": `256`,
  "og:image:height": `256`,
  "og:url": `https://alpha.accsaber.com/profile/${data?.profile?.playerId}`,
  "og:type": "profile.accsaber",
});

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");
  const category = params.category ?? "overall";
  const headers = new Headers();
  headers.set(
    "cache-control",
    "public, max-age=86400, stale-while-revalidate=86400"
  );

  if (!["overall", "true", "standard", "tech"].includes(category))
    throw new Response("Category not found", { status: 404 });

  try {
    const [profile, history, campaignStatus, categories] = await Promise.all([
      getPlayer(params.userId, category),
      getPlayerRankHistory(params.userId, category),
      getPlayerCampaignLevel(params.userId, 0),
      getCategories(),
    ]);

    if (!profile)
      throw new Response("No profile for this category", { status: 404 });

    return json(
      {
        profile,
        history: Object.entries(history).slice(-30),
        categories: [...categories.values()],
        skills: await getSkills(params.userId),
        campaignStatus,
        category,
      },
      {
        headers,
      }
    );
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Response(err.response?.statusText ?? "Error loading player", {
        status: err.response?.status,
      });
    }
    throw err;
  }
};

const ProfileRoute = () => {
  const { profile, history, skills, categories, category, campaignStatus } =
    useLoaderData<{
      profile: Player;
      history: [string, number][];
      skills: number[];
      categories: Category[];
      category: string;
      campaignStatus: CampaignStatus[];
    }>();

  return (
    <>
      <div className="relative overflow-hidden bg-neutral-100 dark:bg-black/20">
        <picture>
          <source
            srcSet={`/profile/${profile.playerId}.avatar.avif`}
            type="image/avif"
          />
          <source
            srcSet={`/profile/${profile.playerId}.avatar.webp`}
            type="image/webp"
          />
          <img
            src={`/profile/${profile.playerId}.avatar.jpeg`}
            alt={`${profile.playerName}'s profile`}
            className="absolute top-0 left-0 object-cover w-full h-full opacity-20 blur-3xl"
          />
        </picture>
        <div
          className={[
            "flex gap-6 pt-8 text-neutral-800 dark:text-neutral-200 items-center",
            "max-w-screen-lg mx-auto px-4 flex-wrap justify-center relative",
          ].join(" ")}
        >
          <picture>
            <source
              srcSet={`/profile/${profile.playerId}.avatar.avif`}
              type="image/avif"
            />
            <source
              srcSet={`/profile/${profile.playerId}.avatar.webp`}
              type="image/webp"
            />
            <img
              src={`/profile/${profile.playerId}.avatar.jpeg`}
              alt={`${profile.playerName}'s profile`}
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
          </picture>
          <div className="flex flex-col justify-center flex-1">
            <div className="">
              <h1 className="text-2xl font-semibold">
                <PlayerName campaignStatus={campaignStatus}>
                  {profile.playerName}
                </PlayerName>
              </h1>
              <div className="flex flex-1 gap-1 text-2xl">
                <div>
                  <Link
                    to={`/leaderboards/${category}?page=${
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
            <SkillTriangle categories={categories}>{skills}</SkillTriangle>
          </div>
        </div>
        <div className="relative h-64 max-w-screen-lg px-8 pb-12 mx-auto">
          <RankGraph history={history} />
        </div>
      </div>
      <div className="max-w-screen-lg py-8 mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default ProfileRoute;
