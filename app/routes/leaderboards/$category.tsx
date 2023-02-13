import { Category } from "$interfaces/api/category";
import { Player } from "$interfaces/api/player";
import PageHeader from "@/PageHeader";
import Pagination from "@/Pagination";
import PlayerRow from "@/PlayerRow";
import {
  LoaderFunction,
  MetaFunction,
  json as jsonResponse,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { json } from "~/lib/api/fetcher";

interface LeaderboardData {
  categories: Category[];
  category: string;
  standings: Player[];
  page: number;
  pages: number;
}

export const loader: LoaderFunction = async ({
  params: { category },
  request,
}) => {
  invariant(category);
  const { searchParams } = new URL(request.url);

  const pageSize = 50;

  const [categories, allStandings] = await Promise.all([
    json<Category[]>("categories"),
    json<Player[]>(`categories/${category}/standings`).catch((error) => {
      throw new Response("Couldn't load standings", { status: 500 });
    }),
  ]);

  const page = parseInt(searchParams.get("page") ?? "1");
  const pages = Math.ceil(allStandings.length / pageSize);
  const standings =
    allStandings.length > pageSize
      ? [...allStandings].splice(pageSize * (page - 1), pageSize)
      : allStandings;

  return jsonResponse({
    category,
    categories,
    standings,
    page,
    pages,
  });
};

const categoryMap = new Map([
  ["true", " True Acc"],
  ["standard", " Standard Acc"],
  ["tech", " Tech Acc"],
  ["overall", " overall"],
]);

export const meta: MetaFunction = ({ data }: { data: LeaderboardData }) => {
  // ungodly hack to do some type coersion
  return {
    title: `AccSaber${categoryMap.get(data.category) ?? ""} ranking`,
  };
};

export default function LeaderboardsPage() {
  const { category, categories, page, pages, standings } =
    useLoaderData<LeaderboardData>();
  return (
    <div>
      <PageHeader
        navigation={[
          {
            href: `/leaderboards/overall`,
            label: `Overall`,
            isCurrent: category == "overall",
          },
          ...categories.map((cat) => ({
            href: `/leaderboards/${cat.categoryName}`,
            label: cat.categoryDisplayName,
            isCurrent: category == cat.categoryName,
          })),
        ]}
      >
        Leaderboards
      </PageHeader>
      <main className="flex flex-col max-w-screen-lg gap-8 p-4 mx-auto">
        {pages > 1 && <Pagination currentPage={page} pages={pages} />}
        <div className="prose dark:prose-invert max-w-none">
          <table className="w-full overflow-auto">
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
              {standings.map((player, n) => (
                <PlayerRow
                  player={player}
                  key={player.playerId}
                  current={category}
                />
              ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && <Pagination currentPage={page} pages={pages} />}
      </main>
    </div>
  );
}
