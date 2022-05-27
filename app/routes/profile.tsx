import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { AxiosError } from "axios";
import invariant from "tiny-invariant";
import { user } from "~/cookies";
import { language } from "~/lib/api/config";
import { get } from "~/lib/api/fetcher";
import PageHeader from "~/lib/components/pageHeader";
import RankGraph from "~/lib/components/rankGraph";
import UserContext from "~/lib/components/usercontext";
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
  "og:image:url": `https://accsaber-image.fly.dev/profile/${data?.profile?.playerId}.png`,
  "og:image:width": `1120`,
  "og:image:height": `664`,
  "og:url": `https://alpha.accsaber.com/profile/${data?.profile?.userId}`,
  "og:type": "profile.accsaber",
});

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");
  if (!/^[0-9]{1,17}$/.test(params.userId))
    throw new Response("Player Not Found", { status: 404 });

  try {
    const [profile, history] = await Promise.all([
      get<Player>(`/players/${params.userId}`),
      get<{ [date: string]: number }>(
        `/players/${params.userId}/recent-rank-history`
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

  const { pathname } = useLocation();

  return (
    <UserContext.Consumer>
      {(user) => (
        <>
          <PageHeader
            image={profile.avatarUrl}
            actionButton={
              user?.playerId !== profile.playerId ? (
                <Form
                  action={`/profile/${profile.playerId}/scores`}
                  method="post"
                >
                  <button
                    type="submit"
                    className="px-4 py-2 shadow-md bg-white dark:bg-neutral-700 rounded text-inherit"
                  >
                    Set as my profile
                  </button>
                </Form>
              ) : undefined
            }
            navigation={[
              {
                href: `/profile/${profile.playerId}/scores`,
                label: `Scores`,
                isCurrent: pathname == `/profile/${profile.playerId}`,
              },
              {
                href: `/profile/${profile.playerId}/campaign`,
                label: `Campaign Progress`,
              },
            ]}
          >
            {profile.playerName}&apos;s Profile
          </PageHeader>
          <div className="max-w-screen-lg mx-auto px-4">
            <div className="flex gap-4 py-8 text-neutral-800 dark:text-neutral-200 items-center">
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
      )}
    </UserContext.Consumer>
  );
};

export default ProfileRoute;
