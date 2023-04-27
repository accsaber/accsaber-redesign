import { RankedMapPageDocument } from "$gql";
import type { MapLeaderboardPlayer } from "$interfaces/api/map-leaderboard-player";
import Complexity from "@/Complexity";
import DifficultyLabel from "@/DifficultyLabel";
import LoadingSpinner from "@/LoadingSpinner";
import PageHeader from "@/PageHeader";
import Pagination from "@/Pagination";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json as jsonResponse } from "@remix-run/node";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import { DateTime } from "luxon";
import invariant from "tiny-invariant";
import { language } from "~/lib/api/config";
import { json } from "~/lib/api/fetcher";
import { gqlClient } from "~/lib/api/gql";
import scoresaberLogo from "~/images/scoresaber.svg";
import PlayerAvatar from "@/PlayerAvatar";
import MapCover from "@/MapCover";
import CDNImage, { getImaginaryURL } from "@/CDNImage";

const pageSize = 25;

export const meta: MetaFunction<typeof loader> = ({ data }) => ({
  title: `${data.map.beatMap?.song?.songName} | AccSaber`,
  description: `${data.map.beatMap?.song?.songName}: A ranked ${data.map.beatMap?.category?.categoryDisplayName} map on AccSaber`,
  "og:image": getImaginaryURL(
    {
      width: 256,
      height: 256,
      src: `covers/${data.map.beatMap?.song?.songHash.toUpperCase()}.png`,
    },
    "jpeg"
  ).toString(),
});

const getMapImage = (songHash: string) =>
  fetch(
    getImaginaryURL(
      {
        width: 24,
        height: 24,
        src: `covers/${songHash.toUpperCase()}.png`,
      },
      "webp",
      "crop"
    )
  ).then((res) => res.arrayBuffer());

export const loader = async ({
  params: { mapId },
  request: { url },
}: LoaderArgs) => {
  const { searchParams } = new URL(url);
  invariant(mapId);

  const headers = new Headers();
  headers.append("Cache-Control", "max-age=60, stale-while-revalidate=6400");

  const [map, allLeaderboard] = await Promise.all([
    gqlClient.request(RankedMapPageDocument, { mapId }),
    json<MapLeaderboardPlayer[]>(
      `map-leaderboards/${encodeURIComponent(mapId)}`
    ).catch((e) => {
      throw new Response("Map not found", { status: e.status });
    }),
  ]);

  const blurData = map.beatMap?.song?.songHash
    ? await getMapImage(map.beatMap?.song?.songHash)
    : "";

  const page = parseInt(searchParams.get("page") ?? "1");
  const pages = Math.ceil(allLeaderboard.length / pageSize);

  const leaderboard =
    allLeaderboard.length > pageSize
      ? [...allLeaderboard].splice(pageSize * (page - 1), pageSize)
      : allLeaderboard;

  return jsonResponse(
    {
      mapId,
      page,
      pages,
      pageSize,
      map,
      leaderboard,
      blurData: blurData
        ? `data:image/webp;base64,${Buffer.from(blurData).toString("base64")}`
        : null,
    },
    { headers }
  );
};

export default function MapPage() {
  const {
    map: { beatMap: map },
    leaderboard,
    page,
    pages,
    blurData,
  } = useLoaderData<typeof loader>();

  return (
    <>
      <PageHeader
        image={`covers/${map?.song?.songHash.toUpperCase()}.png`}
        transparent
        hideTitleUntilScrolled
        miniblur={blurData ?? undefined}
        actionButton={
          <div className="flex">
            <a
              href={`https://beatsaver.com/maps/${map?.song?.beatSaverKey}`}
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
              href={`https://scoresaber.com/leaderboard/${map?.leaderboardId}`}
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
        {map?.song?.songAuthorName} - {map?.song?.songName}
      </PageHeader>

      <main>
        <div className="relative overflow-hidden bg-neutral-100 dark:bg-black/20">
          {blurData ? (
            <CDNImage
              src={`covers/${map?.song?.songHash.toUpperCase()}.png`}
              alt={""}
              width={128}
              height={128}
              className="absolute top-0 left-0 w-full h-full opacity-40 object-cover blur-xl"
              style={{
                background: `url(${blurData}) center / cover`,
              }}
            />
          ) : (
            <MapCover
              songHash={map?.song?.songHash ?? ""}
              width={128}
              height={128}
              className="absolute top-0 left-0 w-full h-full opacity-20 blur-3xl"
            />
          )}
          <div
            className={[
              "flex flex-col md:flex-row gap-6 py-16 text-neutral-800 dark:text-neutral-200 items-center",
              "max-w-screen-lg mx-auto px-4 relative",
            ].join(" ")}
          >
            <CDNImage
              src={`covers/${map?.song?.songHash.toUpperCase()}.png`}
              alt={""}
              width={128}
              height={128}
              className="w-32 h-32 overflow-hidden rounded-lg shadow-lg aspect-square"
              style={{
                background: `url(${blurData}) center / cover`,
              }}
            />
            <div className="flex flex-col gap-1">
              <h1 className="flex flex-row gap-2 w-full text-2xl font-bold items-center">
                <DifficultyLabel>
                  {(map?.difficulty ?? "").toString()}
                </DifficultyLabel>
                <div className="flex-1 w-full">
                  {map?.song?.songAuthorName} - {map?.song?.songName}
                  {map?.song?.songSubName ? (
                    <small>{map?.song?.songSubName}</small>
                  ) : (
                    ""
                  )}
                </div>
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
                  <td className="relative w-10 min-w-[2.5rem] aspect-square not-prose">
                    <NavLink
                      to={`/profile/${score.playerId}`}
                      prefetch="intent"
                    >
                      {({ isPending }) => (
                        <>
                          <PlayerAvatar
                            profile={score}
                            className="absolute top-0 left-0 w-10 h-10 m-0"
                            width={40}
                            height={40}
                            loading="lazy"
                          />
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
                    <Link to={`/profile/${score.playerId}`} prefetch="intent">
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
                  <td>{score.score.toLocaleString(language)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="max-w-screen-lg p-4 mx-auto">
          <Pagination pages={pages} currentPage={page} />
        </div>
      </main>
    </>
  );
}
