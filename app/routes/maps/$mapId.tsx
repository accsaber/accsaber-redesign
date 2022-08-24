import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import type { RankedMap } from "~/lib/interfaces/api/ranked-map";
import type { MapLeaderboardPlayer } from "~/lib/interfaces/api/map-leaderboard-player";
import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getJSON } from "~/lib/api/fetcher";
import PageHeader from "~/lib/components/pageHeader";
import ms from "ms";
import config, { language } from "~/lib/api/config";
import Pagination from "~/lib/components/pagination";
import Complexity from "~/lib/components/complexity";
import scoresaberLogo from "~/lib/images/scoresaber.svg";
import DifficultyLabel from "~/lib/components/difficultyLabel";

export const meta: MetaFunction = ({
  data,
}: {
  data?: { map?: RankedMap };
}) => ({
  title: `${data?.map?.songAuthorName} - ${data?.map?.songName} | AccSaber`,
  "og:title": `${data?.map?.songAuthorName} - ${data?.map?.songName}`,
  "og:description": `Mapped By SSnowy\nComplexity: ${data?.map?.complexity}`,
  "og:image:url": `${
    config.cdnURL
  }/covers/${data?.map?.songHash?.toUpperCase()}.png`,
});

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const pageSize = 50;

  invariant(params.mapId, "Expected User ID");
  const headers = new Headers();
  const [map, leaderboard] = await Promise.all([
    getJSON<RankedMap>(`/ranked-maps/${params.mapId}`, headers),
    getJSON<MapLeaderboardPlayer[]>(
      `/map-leaderboards/${params.mapId}`,
      headers
    ),
  ]);

  if ("errorCode" in map || !map || !leaderboard)
    throw new Response("Map not found", { status: 404 });

  return json(
    {
      map,
      leaderboard: leaderboard.splice((page - 1) * pageSize, pageSize),
      page,
      pages: Math.ceil(leaderboard.length / pageSize),
    },
    { headers }
  );
};

const MapLeaderboardPage = () => {
  const { map, leaderboard, page, pages } = useLoaderData<{
    map: RankedMap;
    leaderboard: MapLeaderboardPlayer[];
    page: number;
    pages: number;
  }>();

  return (
    <>
      <PageHeader
        image={`/maps/${map.leaderboardId}.thumbnail.jpeg`}
        actionButton={
          <div className="flex">
            <a
              href={`https://beatsaver.com/maps/${map.beatSaverKey}`}
              className="block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              aria-label="Download"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </a>
            <a
              href={`https://scoresaber.com/leaderboard/${map.leaderboardId}`}
              className="block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              aria-label="ScoreSaber"
            >
              <img
                src={scoresaberLogo}
                alt="Map Leaderboard on ScoreSaber"
                className="h-6"
              />
            </a>
          </div>
        }
      >
        {map.songAuthorName} - {map.songName}
      </PageHeader>

      <div className="relative overflow-hidden bg-neutral-100 dark:bg-black/20">
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
            alt=""
            className="absolute top-0 left-0 object-cover w-full h-full opacity-20 blur-3xl"
          />
        </picture>
        <div
          className={[
            "flex gap-6 py-8 text-neutral-800 dark:text-neutral-200 items-center",
            "max-w-screen-lg mx-auto px-4",
          ].join(" ")}
        >
          <div className="flex w-32 h-32 overflow-hidden rounded-lg shadow-lg aspect-square">
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
              />
            </picture>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="flex gap-2 text-2xl font-bold">
              {map.songAuthorName} - {map.songName}
              {map.songSubName ? <small>{map.songSubName}</small> : ""}
              <DifficultyLabel>{map.difficulty}</DifficultyLabel>
            </h1>
            <h2 className="text-xl">{map.categoryDisplayName}</h2>
            <h2 className="text-xl">
              Mapped by <strong>{map.levelAuthorName}</strong>
            </h2>
            <Complexity>{map.complexity}</Complexity>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg p-4 mx-auto">
        <Pagination pages={pages} currentPage={page} />
      </div>
      <div className="max-w-full mx-auto overflow-auto prose md:max-w-screen-lg dark:prose-invert whitespace-nowrap">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Player Name</th>
              <th>Time Set</th>
              <th>Accuracy</th>
              <th>AP</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((score, i) => (
              <tr key={score.playerId}>
                <td>#{score.rank}</td>
                <td className="relative w-10 min-w-[2.5rem] aspect-square">
                  <picture>
                    <source
                      srcSet={`/profile/${score.playerId}.thumbnail.avif`}
                      type="image/avif"
                    />
                    <source
                      srcSet={`/profile/${score.playerId}.thumbnail.webp`}
                      type="image/webp"
                    />
                    <img
                      src={`/profile/${score.playerId}.thumbnail.jpeg`}
                      alt={`${score.playerName}'s profile`}
                      loading="lazy"
                      className="absolute top-0 left-0 m-0"
                    />
                  </picture>
                </td>
                <td>
                  <Link to={`/profile/${score.playerId}/overall/scores`}>
                    {score.playerName}
                  </Link>
                </td>
                <td
                  title={new Date(score.timeSet).toLocaleString(language)}
                  className="whitespace-nowrap"
                >
                  {ms(Date.now() - new Date(score.timeSet).getTime(), {
                    long: true,
                  })}{" "}
                  ago
                </td>
                <td>
                  {(score.accuracy * 100).toLocaleString(language, {
                    maximumFractionDigits: 2,
                  })}
                  %
                </td>
                <td>
                  {score.ap.toLocaleString(language, {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-screen-lg p-4 mx-auto">
        <Pagination pages={pages} currentPage={page} />
      </div>
    </>
  );
};

export default MapLeaderboardPage;
