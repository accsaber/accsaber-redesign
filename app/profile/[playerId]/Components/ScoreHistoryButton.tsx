"use client";
import { ChartBarIcon, SortAscendingIcon, XIcon } from "@heroicons/react/solid";
import { useState, useRef, lazy } from "react";
import LoadingSpinner from "~/app/Components/LoadingSpinner";
import { json } from "~/lib/api/fetcher";
import { PlayerScore } from "~/lib/interfaces/api/player-score";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";
import Image from "next/image";
import "chartjs-adapter-luxon";
import {
  LineElement,
  Chart,
  LinearScale,
  PointElement,
  TimeSeriesScale,
} from "chart.js";

export default function ScoreHistoryButton({
  playerId,
  score,
}: {
  playerId: string;
  score: PlayerScore;
}) {
  const [scoreHistory, setScoreHistory] = useState<[Date, number][] | null>();
  const [error, setError] = useState<Record<string, any>>();

  Chart.register(LineElement, LinearScale, TimeSeriesScale, PointElement);

  const historyDialog = useRef<HTMLDialogElement>();

  const loadScoreHistory = () => {
    setScoreHistory(null);
    json<Record<string, number>>(
      `players/${playerId}/score-history/${score.leaderboardId}`
    )
      .catch((error) => {
        setError({ ...error });
        return [];
      })
      .then((history) =>
        setScoreHistory(
          Object.entries(history)
            .reverse()
            .map(([date, accuracy]) => [new Date(date), accuracy])
        )
      );
  };
  return (
    <>
      <button
        onClick={() => {
          historyDialog.current?.showModal();
          if (scoreHistory === undefined) loadScoreHistory();
        }}
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
              src={`https://cdn.accsaber.com/covers/${score.songHash.toUpperCase()}.png`}
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
          {!error ? (
            scoreHistory ? (
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
                      {scoreHistory.map(([date, accuracy]) => (
                        <tr key={date.toString()}>
                          <td title={date.toLocaleString()}>
                            {DateTime.fromJSDate(date).toRelative()}
                          </td>
                          <td>
                            {(accuracy * 100).toLocaleString(
                              navigator.language,
                              {
                                maximumFractionDigits: 2,
                              }
                            )}
                            %
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="md:w-96">
                  <Line
                    data={{
                      datasets: [
                        {
                          data: Object.fromEntries(
                            scoreHistory
                              .map(([date, accuracy]) => [
                                date.toISOString(),
                                accuracy * 100,
                              ])
                              .reverse()
                          ),
                          label: "rank",
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
            ) : (
              <div className="p-32">
                <LoadingSpinner />
              </div>
            )
          ) : error?.status == 500 ? (
            "No history for this score"
          ) : (
            error?.message ?? error?.error ?? "Error loading score history"
          )}
        </div>
      </dialog>
    </>
  );
}
