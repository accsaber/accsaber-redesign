import { notFound } from "next/navigation";
import { use } from "react";
import invariant from "tiny-invariant";
import Pagination from "~/app/Components/Pagination";
import PlayerRow from "~/app/Components/PlayerRow";
import { json } from "~/lib/api/fetcher";
import { Player } from "~/lib/interfaces/api/player";

const LeaderboardPage = ({
  params,
  searchParams,
}: {
  params: { category?: string } | Record<string, string>;
  searchParams: Record<string, string | string[]>;
}) => {
  invariant(params.category);

  const pageSize = 50;

  const allStandings = use(
    json<Player[]>(`categories/${params.category}/standings`).catch(() => {
      throw notFound();
    })
  );

  const page = parseInt(searchParams.page?.toString() ?? "1");

  const pages = Math.ceil(allStandings.length / pageSize);

  const standings =
    allStandings.length > pageSize
      ? [...allStandings].splice(pageSize * (page - 1), pageSize)
      : allStandings;

  return (
    <main className="flex flex-col max-w-screen-lg gap-8 p-4 mx-auto">
      {pages > 1 ? <Pagination currentPage={page} pages={pages} /> : ""}
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
                current={params.category}
              />
            ))}
          </tbody>
        </table>
      </div>
      {pages > 1 ? <Pagination currentPage={page} pages={pages} /> : ""}
    </main>
  );
};

export default LeaderboardPage;
