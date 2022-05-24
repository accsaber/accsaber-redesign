import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { AxiosError } from "axios";
import invariant from "tiny-invariant";
import { language } from "~/lib/api/config";
import apiFetcher from "~/lib/api/fetcher";
import PageHeader from "~/lib/components/pageHeader";
import RankGraph from "~/lib/components/rankGraph";
import type { Player } from "~/lib/interfaces/api/player";

export const meta: MetaFunction = ({
  data,
}: {
  data: { profile?: Player };
}) => ({
  title: `${
    data?.profile?.playerName ?? "Unknown Player"
  }'s Profile | AccSaber`,
});

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");
  if (!/^[0-9]{1,17}$/.test(params.userId))
    throw new Response("Player Not Found", { status: 404 });

  try {
    const [{ data: profile, status, statusText }, { data: history }] =
      await Promise.all([
        apiFetcher.get<Player>(`/players/${params.userId}`, {
          validateStatus: null,
        }),
        apiFetcher.get<{ [date: string]: number }>(
          `/players/${params.userId}/recent-rank-history`,
          {
            validateStatus: null,
          }
        ),
      ]);

    return json({ profile, history: Object.entries(history) });
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
      <PageHeader image={profile.avatarUrl} hideTitleUntilScrolled>
        {profile.playerName}&apos;s Profile
      </PageHeader>
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="flex gap-4 p-8 text-neutral-800 dark:text-neutral-200">
          <div className="flex overflow-hidden rounded-full h-32 aspect-square">
            <img
              src={profile.avatarUrl}
              alt={`${profile.playerName}'s avatar`}
            />
          </div>
          <div className="flex flex-col justify-center gap-2 flex-1">
            <h1 className="text-2xl font-semibold">{profile.playerName}</h1>
            <h1 className="text-2xl font-semibold">
              {profile.ap.toLocaleString(language, {
                maximumFractionDigits: 2,
              })}
              AP
            </h1>
          </div>
          <div className="flex-1 p-4 bg-neutral-100 dark:bg-neutral-800">
            <RankGraph history={history} />
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default ProfileRoute;
