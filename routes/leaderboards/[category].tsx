import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import { isErrorResponse, json } from "$fetcher";
import type { Player } from "$interfaces/api/player.ts";
import type { Category } from "$interfaces/api/category.ts";
import Layout from "$components/Layout.tsx";
import PlayerRow from "$components/PlayerRow.tsx";
import PageHeader from "$islands/PageHeader.tsx";

interface CategoryPageProps {
  categories: Category[];
  standings: Player[];
}

export const handler: Handlers<CategoryPageProps> = {
  async GET(req, ctx) {
    const [standings, categories] = await Promise.all([
      json<Player[]>(`categories/${ctx.params.category}/standings`),
      json<Category[]>("categories"),
    ]);

    if (isErrorResponse(standings) || isErrorResponse(categories))
      return ctx.renderNotFound();

    return ctx.render({
      categories,
      standings: standings.splice(0, 50),
    });
  },
};

export default function CategoryLeaderboard(
  props: PageProps<CategoryPageProps>
) {
  const { categories, standings } = props.data;
  const { category: current } = props.params;
  return (
    <Layout>
      <PageHeader
        navigation={[
          { categoryName: "overall", categoryDisplayName: "Overall" },
          ...(categories ?? []),
        ].map(({ categoryDisplayName, categoryName }) => ({
          href: `/leaderboards/${categoryName}`,
          label: categoryDisplayName,
          isCurrent: categoryName == current,
        }))}
      >
        Leaderboards
      </PageHeader>
      <main className="prose text-light w-full max-w-screen-lg mx-auto">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th></th>
              <th>Name</th>
              <th>AP</th>
              <th className="hidden md:table-cell">Average Acc</th>
              <th className="hidden md:table-cell">Ranked Plays</th>
              <th className="hidden md:table-cell">Average AP</th>
              <th className="hidden md:table-cell">HMD</th>
            </tr>
          </thead>
          <tbody>
            {standings?.map((player) => (
              <PlayerRow
                player={player}
                key={player.playerId}
                current={current}
              />
            ))}
          </tbody>
        </table>
      </main>
    </Layout>
  );
}
