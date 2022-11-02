import Link from "next/link";
import { use } from "react";
import invariant from "tiny-invariant";
import { language } from "~/lib/api/config";
import { json } from "~/lib/api/fetcher";
import { MapLeaderboardPlayer } from "~/lib/interfaces/api/map-leaderboard-player";
import Image from "next/image";
import Pagination from "~/app/Components/Pagination";
import { notFound } from "next/navigation";
import MapHeader from "../Components/MapHeader";
import { DateTime } from "luxon";

export default function MapLeaderboardPage({
  params,
  searchParams,
}: {
  params?: { mapId?: string } | Record<string, string>;
  searchParams?:
    | { page?: string | string[] }
    | Record<string, string | string[]>;
}) {
  invariant(params?.mapId);

  if (/[^0-9]/.test(params.mapId)) throw notFound();

  const pageSize = 50;

  const allLeaderboard = use(
    json<MapLeaderboardPlayer[]>(
      `map-leaderboards/${encodeURIComponent(params.mapId)}`
    )
  );

  const page = parseInt(searchParams?.page?.toString() ?? "1");
  const pages = Math.ceil(allLeaderboard.length / pageSize);

  const leaderboard =
    allLeaderboard.length > pageSize
      ? [...allLeaderboard].splice(pageSize * (page - 1), pageSize)
      : allLeaderboard;

  return (
    <>
      <MapHeader mapId={params.mapId} />
      <div className="max-w-screen-lg p-4 mx-auto">
        <Pagination
          searchParams={searchParams}
          pages={pages}
          currentPage={page}
        />
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
                  <Image
                    src={score.avatarUrl}
                    alt={`${score.playerName}'s profile`}
                    loading="lazy"
                    className="absolute top-0 left-0 m-0"
                    width={40}
                    height={40}
                  />
                </td>
                <td>
                  <Link
                    prefetch={false}
                    href={`/profile/${score.playerId}/overall/scores`}
                  >
                    {score.playerName}
                  </Link>
                </td>
                <td
                  title={new Date(score.timeSet).toLocaleString(language)}
                  className="whitespace-nowrap"
                >
                  {DateTime.fromISO(score.timeSet).toRelative()}
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
        <Pagination
          searchParams={searchParams}
          pages={pages}
          currentPage={page}
        />
      </div>
    </>
  );
}
