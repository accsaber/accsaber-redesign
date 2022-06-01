import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import type { RankedMap } from "~/lib/interfaces/api/ranked-map";
import type { MapLeaderboardPlayer } from "~/lib/interfaces/api/map-leaderboard-player";
import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { get } from "~/lib/api/fetcher";
import PageHeader from "~/lib/components/pageHeader";
import ms from "ms";
import config, { language } from "~/lib/api/config";
import Pagination from "~/lib/components/pagination";
import Complexity from "~/lib/components/complexity";

export const meta: MetaFunction = ({
  data,
}: {
  data: { map?: RankedMap };
}) => ({
  title: `${data.map?.songAuthorName} - ${data.map?.songName} | AccSaber`,
  "og:title": `${data.map?.songAuthorName} - ${data.map?.songName}`,
  "og:description": `Mapped By SSnowy\nComplexity: ${data.map?.complexity}`,
  "og:image:url": `${
    config.cdnURL
  }/covers/${data.map?.songHash.toUpperCase()}.png`,
});

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const pageSize = 50;

  invariant(params.mapId, "Expected User ID");
  const [map, leaderboard] = await Promise.all([
    get<RankedMap>(`/ranked-maps/${params.mapId}`),
    get<MapLeaderboardPlayer[]>(`/map-leaderboards/${params.mapId}`),
  ]);

  return json({
    map,
    leaderboard: leaderboard.splice((page - 1) * pageSize, pageSize),
    page,
    pages: Math.ceil(leaderboard.length / pageSize),
  });
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
      <PageHeader image={`/maps/${map.leaderboardId}.thumbnail.webp`}>
        {map.songAuthorName} - {map.songName}
      </PageHeader>

      <div className="bg-neutral-100 dark:bg-black/20">
        <div
          className={[
            "flex gap-6 py-8 text-neutral-800 dark:text-neutral-200 items-center",
            "max-w-screen-lg mx-auto px-4",
          ].join(" ")}
        >
          <div className="flex overflow-hidden rounded-lg shadow-lg w-32 h-32 aspect-square">
            <img
              src={`/maps/${map.leaderboardId}.cover.webp`}
              alt="cover art"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">
              {map.songAuthorName} - {map.songName}
            </h1>
            <h2 className="text-xl">Mapped by {map.levelAuthorName}</h2>
            <Complexity>{map.complexity}</Complexity>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto p-4">
        <Pagination pages={pages} currentPage={page} />
      </div>
      <div className="prose dark:prose-invert max-w-screen-lg mx-auto p-4">
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
                <td className="relative aspect-square w-10">
                  <img
                    src={`/profile/${score.playerId}.thumbnail.webp`}
                    alt={``}
                    loading="lazy"
                    className="absolute top-0 left-0 m-0"
                  />
                </td>
                <td>
                  <Link to={`/profile/${score.playerId}/overall/scores`}>
                    {score.playerName}
                  </Link>
                </td>
                <td title={new Date(score.timeSet).toLocaleString(language)}>
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

      <div className="max-w-screen-lg mx-auto p-4">
        <Pagination pages={pages} currentPage={page} />
      </div>
    </>
  );
};

export default MapLeaderboardPage;
