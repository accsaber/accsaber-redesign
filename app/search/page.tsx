import { Player } from "~/lib/interfaces/api/player";
import { RankedMap } from "~/lib/interfaces/api/ranked-map";
import { search } from "~/pages/api/search/[query]";
import MapResult from "./Components/MapResult";
import PlayerResult from "./Components/PlayerResult";

const isMap = (i: RankedMap | Player): i is RankedMap => {
  return "songHash" in i;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Record<string, string>;
  params?: Record<string, string>;
}) {
  const query = searchParams?.q ?? "";
  const results = await search(query);

  return (
    <main className="flex flex-col max-w-screen-lg gap-4 p-4 mx-auto">
      <form className="flex overflow-hidden rounded shadow" method="get">
        <input
          type="search"
          name="q"
          autoFocus
          placeholder="Search"
          className="flex-1 p-2 px-3 focus:outline-none dark:bg-neutral-800 dark:text-white"
          defaultValue={query}
        />
        <button
          type="submit"
          aria-label="Search"
          className="p-2 dark:bg-neutral-800 dark:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>

      <div>
        {results.map((result) =>
          isMap(result.item) ? (
            <MapResult map={result.item} key={result.item.leaderboardId} />
          ) : (
            <PlayerResult player={result.item} key={result.item.playerId} />
          )
        )}
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
