import type {
  LoaderFunction,
  MetaFunction} from "@remix-run/node";
import {
  ActionFunction,
  redirect,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { AxiosError } from "axios";
import invariant from "tiny-invariant";
import { user } from "~/cookies";
import { language } from "~/lib/api/config";
import { getJSON } from "~/lib/api/fetcher";
import PageHeader from "~/lib/components/pageHeader";
import RankGraph from "~/lib/components/rankGraph";
import UserContext from "~/lib/components/usercontext";
import type { Category } from "~/lib/interfaces/api/category";
import type { Player } from "~/lib/interfaces/api/player";

export const meta: MetaFunction = ({
  data,
}: {
  data: { profile?: Player };
}) => ({
  title: `${
    data?.profile?.playerName ?? "Unknown Player"
  }'s Profile | AccSaber`,
  "og:title": `${data?.profile?.playerName ?? "Unknown Player"}'s Profile`,
  "og:description": `Rank#${data.profile?.rank}\nAP: ${data.profile?.ap.toFixed(
    2
  )}\n`,
  description: `Rank #${data.profile?.rank}\nAP: ${data.profile?.ap.toFixed(
    2
  )}\n`,
  "og:image:url": `https://accsaber-image.fly.dev/profile/${data?.profile?.playerId}.png`,
  "og:image:width": `1120`,
  "og:image:height": `664`,
  "og:url": `https://alpha.accsaber.com/profile/${data?.profile?.userId}`,
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

  const categoryUrl = category == "overall" ? "" : `/${params.category}`;
  if (!/^[0-9]{1,17}$/.test(params.userId))
    throw new Response("Player Not Found", { status: 404 });

  if (!["overall", "true", "standard", "tech"].includes(category))
    throw new Response("Category not found", { status: 404 });

  try {
    const [profile, history, categories] = await Promise.all([
      getJSON<Player>(`/players/${params.userId}${categoryUrl}`, headers),
      getJSON<{ [date: string]: number }>(
        `/players/${params.userId}${categoryUrl}/recent-rank-history`,
        headers
      ),
      getJSON<Category[]>("/categories", headers),
    ]);

    return json(
      {
        profile,
        history: Object.entries(history).slice(-30),
        categories,
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
  const { profile, history } = useLoaderData<{
    profile: Player;
    history: [string, number][];
  }>();

  return (
    <>
      <div className="bg-neutral-100 dark:bg-black/20">
        <div
          className={[
            "flex gap-6 py-8 text-neutral-800 dark:text-neutral-200 items-center",
            "max-w-screen-lg mx-auto px-4 h-72",
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
              className="w-32 h-32  rounded-full shadow-lg "
            />
          </picture>
          <div className="flex flex-1 flex-col justify-center">
            <div className="">
              <h1 className="text-2xl font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-[12rem]">
                {profile.playerName}
              </h1>
              <div className="text-2xl flex gap-1">
                <div>#{profile.rank.toLocaleString(language)}</div>

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
          <div className="hidden md:flex">
            <RankGraph history={history} />
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <Outlet />
      </div>
    </>
  );
};

export default ProfileRoute;
