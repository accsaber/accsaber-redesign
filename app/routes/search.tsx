import PlayerResult from "@/PlayerResult";
import MapResult from "@/MapResult";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { search } from "./api/search";
import { Form, useLoaderData } from "@remix-run/react";
import type { Player } from "$interfaces/api/player";
import type { RankedMap } from "$interfaces/api/ranked-map";

interface SearchData {
  query: string;
  results: Awaited<ReturnType<typeof search>>;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q") ?? "";

  if (query.length < 3) return json({ query, results: [] });

  const results = await search(query);

  return json({ query, results });
};

const isMap = (i: RankedMap | Player): i is RankedMap => {
  return "songHash" in i;
};

export default function SearchPage() {
  const { query, results } = useLoaderData<SearchData>();
  return (
    <main className="flex flex-col max-w-screen-lg gap-4 p-4 mx-auto w-full">
      <Form className="flex overflow-hidden rounded shadow" method="get">
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
      </Form>

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
