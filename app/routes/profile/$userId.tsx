import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { user } from "~/cookies";
import { get } from "~/lib/api/fetcher";
import PageHeader from "~/lib/components/pageHeader";
import UserContext from "~/lib/components/usercontext";
import type { Category } from "~/lib/interfaces/api/category";
import type { Player } from "~/lib/interfaces/api/player";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.userId, "Expected User ID");

  const [profile, categories] = await Promise.all([
    get<Player>(`/players/${params.userId}`),
    get<Category[]>("/categories"),
  ]);

  return json({ profile, categories });
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
            image={profile.avatarUrl}
            actionButton={
              user?.playerId !== profile.playerId ? (
                <Form
                  action={`/profile/${profile.playerId}/overall/scores`}
                  method="post"
                  replace
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
                href: `/profile/${profile.playerId}/overall`,
                label: `Overall`,
              },
              ...categories.map((category) => ({
                href: `/profile/${profile.playerId}/${category.categoryName}`,
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
