import type { LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useLocation } from "@remix-run/react";
import type { Player } from "~/lib/interfaces/api/player";
import type { RankedMap } from "~/lib/interfaces/api/ranked-map";
import Fuse from "fuse.js";
import { getMapList } from "~/lib/api/map";
import { client } from "~/lib/api/fetcher";
import DifficultyLabel from "~/lib/components/difficultyLabel";
import { language } from "~/lib/api/config";

export const meta = () => ({
  title: "Search | AccSaber",
});

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) return { results: [] };

  const [maps, playersRaw] = await Promise.all([
    await getMapList(),
    await client.hGetAll(`accsaber:players:overall`),
  ]);
  const players = Object.values(playersRaw).map((i) => JSON.parse(i) as Player);

  const fuse = new Fuse([...players, ...maps], {
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

  return { results: fuse.search(query ?? "") };
};

const isMap = (i: RankedMap | Player): i is RankedMap => {
  return "songHash" in i;
};

const MapResult = ({ map }: { map: RankedMap }) => (
  <Link
    to={`/maps/${map.leaderboardId}`}
    className={[
      "hover:bg-neutral-100",
      "dark:hover:bg-neutral-800",
      "rounded-2xl",
      "p-4",
      "flex",
      "gap-4",
      "text-neutral-800",
      "dark:text-neutral-200",
    ].join(" ")}
  >
    <picture>
      <source
        srcSet={`/maps/${map.leaderboardId}.cover.avif`}
        type="image/avif"
      />
      <source
        srcSet={`/maps/${map.leaderboardId}.cover.webp`}
        type="image/webp"
      />
      <img
        src={`/maps/${map.leaderboardId}.cover.jpeg`}
        alt={`cover art`}
        className="w-20 h-20 rounded-xl shadow-md"
        loading="lazy"
      />
    </picture>
    <div className="flex flex-col justify-center ">
      <div className="text-2xl">
        {map.songAuthorName} - {map.songName} <small>{map.songSubName}</small>
      </div>
      <div className="text-xl flex gap-2">
        <DifficultyLabel>{map.difficulty}</DifficultyLabel>
        <span className="opacity-70">{map.levelAuthorName}</span>
      </div>
    </div>
  </Link>
);

const PlayerResult = ({ player: profile }: { player: Player }) => (
  <Link
    to={`/profile/${profile.playerId}/overall/scores`}
    className={[
      "hover:bg-neutral-100",
      "dark:hover:bg-neutral-800",
      "rounded-2xl",
      "p-4",
      "flex",
      "gap-4",
      "text-neutral-800",
      "dark:text-neutral-200",
    ].join(" ")}
  >
    <picture>
      <source
        srcSet={`/profile/${profile.playerId}.avatar.avif`}
        type="image/avif"
      />
      <source
        srcSet={`/profile/${profile.playerId}.avatar.webp`}
        type="image/webp"
      />
      <img
        src={`/profile/${profile.playerId}.avatar.jpeg`}
        alt={`${profile.playerName}'s profile`}
        className="w-16 h-16 rounded-full shadow-lg "
        loading="lazy"
      />
    </picture>
    <div className="flex flex-col justify-center">
      <div className="text-2xl">{profile.playerName}</div>
      <div className="text-xl opacity-60">
        #{profile.rank} /{" "}
        {profile.ap.toLocaleString(language, { maximumFractionDigits: 2 })}AP
      </div>
    </div>
  </Link>
);

const SearchPage = () => {
  const params = new URLSearchParams(useLocation().search);
  const { results } = useLoaderData<{
    results: Fuse.FuseResult<RankedMap | Player>[];
  }>() ?? {
    results: [],
  };
  return (
    <main className="p-4 max-w-screen-lg mx-auto flex flex-col gap-4">
      <Form
        className="flex shadow rounded overflow-hidden"
        replace
        method="get"
      >
        <input
          type="search"
          name="q"
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
            className="h-5 w-5"
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
