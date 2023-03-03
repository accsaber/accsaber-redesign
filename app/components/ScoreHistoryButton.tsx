"use client";
import { ChartBarIcon, XMarkIcon as XIcon } from "@heroicons/react/20/solid";
import { useState, useRef, Suspense } from "react";
import LoadingSpinner from "@/LoadingSpinner";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";
import Image from "@/CDNImage";
import "chartjs-adapter-luxon";
import {
  LineElement,
  Chart,
  LinearScale,
  PointElement,
  TimeSeriesScale,
} from "chart.js";
import type { ScoreHistoryNodeFragment, ScoreRowFragment } from "$gql";
import { ScoreHistoryDocument } from "$gql";
import { useGql } from "~/lib/api/gql";

function ScoreHistoryBody({
  playerId,
  leaderboardId,
}: {
  playerId: string;
  leaderboardId: string;
}) {
  const { data } = useGql(ScoreHistoryDocument, { playerId, leaderboardId });
  if (!data) return <LoadingSpinner />;
  const { scoreDataHistories, beatMap } = data;
  return (
    <>
      <div className="flex flex-col min-h-[16rem] gap-4 md:flex-row">
        <div className="w-full prose dark:prose-invert prose-neutral md:w-72">
          <table>
            <thead>
              <tr>
                <th>Time Set</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {(scoreDataHistories?.nodes as ScoreHistoryNodeFragment[])?.map(
                ({ timeSet, score }) => (
                  <tr key={timeSet}>
                    <td title={new Date(timeSet).toLocaleString()}>
                      {DateTime.fromISO(timeSet).toRelative()}
                    </td>
                    <td>
                      {(
                        (score / (beatMap?.maxScore ?? NaN)) *
                        100
                      ).toLocaleString(navigator.language, {
                        maximumFractionDigits: 2,
                      })}
                      %
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="md:w-96">
          <Line
            data={{
              datasets: [
                {
                  data: Object.fromEntries(
                    (scoreDataHistories?.nodes as ScoreHistoryNodeFragment[])
                      .map(({ timeSet, score }) => [
                        timeSet,
                        (score / (beatMap?.maxScore ?? NaN)) * 100,
                      ])
                      .reverse()
                  ),
                  label: "Accuracy",
                  borderColor: "#2563eb",
                },
              ],
            }}
            color={"red"}
            className={``}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  intersect: false,
                  mode: "index",
                },
              },
              hover: {
                intersect: false,
                mode: "index",
              },
              scales: {
                x: {
                  type: "timeseries",
                },
              },
              elements: {
                line: {
                  fill: false,
                },
                point: {
                  radius: 0,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default function ScoreHistoryButton({
  playerId,
  score,
}: {
  playerId: string;
  score: ScoreRowFragment;
}) {
  const [shown, setShown] = useState(false);

  Chart.register(LineElement, LinearScale, TimeSeriesScale, PointElement);

  const historyDialog = useRef<HTMLDialogElement>();
  return (
    <>
      <button
        onClick={() => {
          historyDialog.current?.showModal();
          setShown(true);
        }}
        aria-label="Score History"
        className="inline align-middle"
      >
        <ChartBarIcon className="w-4 h-6" />
      </button>
      <dialog
        ref={(_this) => (historyDialog.current = _this ?? undefined)}
        className="p-6 bg-white shadow-xl rounded-2xl dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center h-10 gap-3">
            <Image
              src={`https://cdn.accsaber.com/covers/${score.songHash?.toUpperCase()}.png`}
              className="w-10 h-10 rounded"
              loading="lazy"
              alt="Cover art"
              width={40}
              height={40}
            />
            <div className="flex-1 text-lg font-semibold h-max">
              {score.songAuthorName} - {score.songName}
            </div>
            <button onClick={() => historyDialog.current?.close()}>
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            {shown && (
              <ScoreHistoryBody
                leaderboardId={score.leaderboardId}
                playerId={playerId}
              />
            )}
          </Suspense>
        </div>
      </dialog>
    </>
  );
}
