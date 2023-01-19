import Fuse from "fuse.js";
import { RankedMap } from "~/lib/interfaces/api/ranked-map";
import { Player } from "~/lib/interfaces/api/player";
import { json } from "~/lib/api/fetcher";
import ms from "ms";

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

let lastUpdated = 0;

const updateSearchCache = async (): Promise<void> => {
  if (Date.now() - lastUpdated < ms("20s")) return;

  const [players, maps] = await Promise.all([
    json<Player[]>("players"),
    json<RankedMap[]>("ranked-maps"),
  ]);

  fuse.setCollection([...players, ...maps]);
  lastUpdated = Date.now();
};

export const search = async (query: string) => {
  await updateSearchCache();
  return fuse.search(query);
};

export interface SearchResponse {
  query: string;
  time: number;
  results: Awaited<ReturnType<typeof search>>;
}

const timer = typeof performance !== "undefined" ? performance : Date;

const searchHandler = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();
  if (!query)
    return new Response(
      JSON.stringify({ error: 400, message: "Invalid search query" })
    );

  const timeStart = timer.now();
  const results = await search(query);
  const timeEnd = timer.now();

  const response: SearchResponse = {
    query,
    results,
    time: timeEnd - timeStart,
  };

  return new Response(JSON.stringify(response, undefined), {
    headers: {
      "content-type": "application/json",
    },
  });
};

export const config = {
  runtime: "edge",
};

export default searchHandler;
