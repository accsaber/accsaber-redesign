import { LoaderFunction, json } from "@remix-run/node";
import { Form, Link, useLoaderData, useLocation } from "@remix-run/react";
import type { Player } from "~/lib/interfaces/api/player";
import type { RankedMap } from "~/lib/interfaces/api/ranked-map";
import Fuse from "fuse.js";
import { getMapList } from "~/lib/api/map";
import { client } from "~/lib/api/fetcher";
import DifficultyLabel from "~/lib/components/difficultyLabel";
import { language } from "~/lib/api/config";
import { search } from "./api/search";
import PlayerResult from "~/lib/components/PlayerResult";
import MapResult from "~/lib/components/MapResult";

export const meta = () => ({
  title: "Search | AccSaber",
});

const fuse = new Fuse<Player | RankedMap>([], {
  keys: [
    "playerName",
    "songName",
    "songSubName",
    "songAuthorName",
    "levelAuthorName",
  ],
  minMatchCharLength: 2,
  threshold: 0.3,
});

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

const SearchPage = () => {
  const params = new URLSearchParams(useLocation().search);
  const { results } = useLoaderData<{
    results: Fuse.FuseResult<RankedMap | Player>[];
  }>() ?? {
    results: [],
  };
  return (
    <main className="flex flex-col max-w-screen-lg gap-4 p-4 mx-auto">
      <Form
        className="flex overflow-hidden rounded shadow"
        replace
        method="get"
      >
        <input
          type="search"
          name="q"
          autoFocus
          placeholder="Search"
          className="flex-1 p-2 px-3 focus:outline-none dark:bg-neutral-800 dark:text-white"
          defaultValue={params.get("q") ?? ""}
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
        {results.map((result, n) =>
          isMap(result.item) ? (
            <MapResult map={result.item} key={result.item.leaderboardId} />
          ) : (
            <PlayerResult player={result.item} key={result.item.playerId} />
          )
        )}
      </div>
    </main>
  );
};

export default SearchPage;
