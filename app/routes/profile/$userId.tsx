import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCategories } from "~/lib/api/category";
import { getPlayer } from "~/lib/api/player";
import PageHeader from "~/lib/components/pageHeader";
import UserContext from "~/lib/components/userContext";
import type { Category } from "~/lib/interfaces/api/category";
import type { Player } from "~/lib/interfaces/api/player";
import scoresaberLogo from "~/lib/images/scoresaber.svg";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.userId, "Expected User ID");

  const headers = new Headers();

  headers.set(
    "cache-control",
    "public, max-age=86400, stale-while-revalidate=86400"
  );

  const [profile, categories] = await Promise.all([
    getPlayer(params.userId),
    getCategories(),
  ]);

  if (!profile) throw new Response("Player Not Found", { status: 404 });

  return json(
    { profile, categories: [...categories.values()] },
    {
      headers,
    }
  );
};
const UserContainer = () => {
  const { profile, categories } = useLoaderData<{
    profile: Player;
    categories: Category[];
  }>();
  return (
    <>
      <UserContext.Consumer>
        {(user) => (
          <PageHeader
            image={`/profile/${profile.playerId}.thumbnail.jpeg`}
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
                    action={`/profile/${profile.playerId}/overall/scores`}
                    method="post"
                    replace
                  >
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white rounded shadow-md dark:bg-neutral-700 text-inherit"
                    >
                      Set as my profile
                    </button>
                  </Form>
                ) : undefined}
              </div>
            }
            navigation={[
              {
                href: `/profile/${profile.playerId}/overall/scores`,
                label: `Overall`,
              },
              ...categories.map((category) => ({
                href: `/profile/${profile.playerId}/${category.categoryName}/scores`,
                label: category.categoryDisplayName,
              })),
            ]}
          >
            {profile.playerName}&apos;s Profile
          </PageHeader>
        )}
      </UserContext.Consumer>
      <Outlet />
    </>
  );
};

export default UserContainer;
