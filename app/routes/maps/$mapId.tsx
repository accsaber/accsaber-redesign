import type { RankedMapPageQuery } from "$gql";
import { RankedMapPageDocument } from "$gql";
import type { MapLeaderboardPlayer } from "$interfaces/api/map-leaderboard-player";
import CDNImage from "@/CDNImage";
import Complexity from "@/Complexity";
import DifficultyLabel from "@/DifficultyLabel";
import LoadingSpinner from "@/LoadingSpinner";
import Pagination from "@/Pagination";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json as jsonResponse } from "@remix-run/node";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import Avatar from "boring-avatars";
import { DateTime } from "luxon";
import invariant from "tiny-invariant";
import { language } from "~/lib/api/config";
import { json } from "~/lib/api/fetcher";
import { gqlClient } from "~/lib/api/gql";

const pageSize = 25;

interface MapPageData {
  page: number;
  pages: number;
  pageSize: number;
  map: RankedMapPageQuery;
  leaderboard: MapLeaderboardPlayer[];
}

export const meta: MetaFunction = ({ data }: { data: MapPageData }) => ({
  title: `${data.map.beatMap?.song?.songName} | AccSaber`,
});

export const loader: LoaderFunction = async ({
  params: { mapId },
  request: { url },
}) => {
  const { searchParams } = new URL(url);
  invariant(mapId);

  const [map, allLeaderboard] = await Promise.all([
    gqlClient.request(RankedMapPageDocument, { mapId }),
    json<MapLeaderboardPlayer[]>(
      `map-leaderboards/${encodeURIComponent(mapId)}`
    ).catch((e) => {
      throw new Response("Map not found", { status: e.status });
    }),
  ]);

  const page = parseInt(searchParams.get("page") ?? "1");
  const pages = Math.ceil(allLeaderboard.length / pageSize);

  const leaderboard =
    allLeaderboard.length > pageSize
      ? [...allLeaderboard].splice(pageSize * (page - 1), pageSize)
      : allLeaderboard;

  return jsonResponse({
    mapId,
    page,
    pages,
    pageSize,
    map,
    leaderboard,
  });
};

export default function MapPage() {
  const {
    map: { beatMap: map },
    leaderboard,
    page,
    pages,
  } = useLoaderData<MapPageData>();

  return (
    <main>
      <div className="relative overflow-hidden bg-neutral-100 dark:bg-black/20">
        <CDNImage
          src={`covers/${map?.song?.songHash.toUpperCase()}.png`}
          alt=""
          className="absolute top-0 left-0 object-cover w-full h-full opacity-20 blur-3xl"
          width={256}
          height={256}
        />
        <div
          className={[
            "flex flex-col md:flex-row gap-6 py-16 text-neutral-800 dark:text-neutral-200 items-center",
            "max-w-screen-lg mx-auto px-4",
          ].join(" ")}
        >
          <div className="flex w-32 h-32 overflow-hidden rounded-lg shadow-lg aspect-square">
            <CDNImage
              src={`covers/${map?.song?.songHash.toUpperCase()}.png`}
              alt=""
              width={256}
              height={256}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="flex flex-col gap-2 text-2xl font-bold md:flex-row">
              {map?.song?.songAuthorName} - {map?.song?.songName}
              {map?.song?.songSubName ? (
                <small>{map?.song?.songSubName}</small>
              ) : (
                ""
              )}
              <DifficultyLabel>
                {(map?.difficulty ?? "").toString()}
              </DifficultyLabel>
            </h1>
            <h2 className="text-xl">{map?.category?.categoryDisplayName}</h2>
            <h2 className="text-xl">
              Mapped by <strong>{map?.song?.levelAuthorName}</strong>
            </h2>
            <Complexity>{map?.complexity ?? 0}</Complexity>
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
                  <NavLink to={`/profile/${score.playerId}/overall/scores`}>
                    {({ isPending }) => (
                      <>
                        <div className="absolute top-0 left-0 w-10 h-10">
                          <Avatar square variant="beam" name={score.playerId} />
                        </div>

                        {score.playerId.startsWith("7") && (
                          <CDNImage
                            src={`avatars/${score.playerId}.jpg`}
                            alt={`${score.playerName}'s profile`}
                            loading="lazy"
                            className="absolute top-0 left-0 m-0"
                            width={40}
                            height={40}
                          />
                        )}
                        {isPending && (
                          <div className="absolute top-0 left-0 w-10 h-10 flex bg-white/80 dark:bg-black/80">
                            <LoadingSpinner className="p-2 w-10 h-10" />
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
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
        <Pagination pages={pages} currentPage={page} />
      </div>
    </main>
  );
}
