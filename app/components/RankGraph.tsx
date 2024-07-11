"use client";
import { Line } from "react-chartjs-2";
import {
  LineElement,
  Chart,
  LinearScale,
  TimeSeriesScale,
  PointElement,
} from "chart.js";
import "chartjs-adapter-luxon";
import type { RankHistoryDayFragment } from "$gql";

const RankGraph: React.FC<{
  children?: never;
  history: RankHistoryDayFragment[];
}> = ({ history }) => {
  Chart.register(LineElement, LinearScale, TimeSeriesScale, PointElement);
  return (
    <Line
      data={{
        datasets: [
          {
            data: history.map(({ date, ranking }) => [date, ranking]),
            label: "Rank",
            yAxisID: "y",
            borderColor: "#2563eb",
          },
          {
            data: history.map(({ date, ap }) => [date, Math.round(ap)]),
            label: "AP",
            yAxisID: "yAp",
            borderColor: "#22c55e",
          },
          {
            data: history.map(({ date, rankedPlays }) => [date, rankedPlays]),
            label: "Ranked Plays",
            yAxisID: "yPlays",
            borderColor: "#7e7e7e55",
          },
        ],
      }}
      color={"red"}
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
          yAp: {
            grid: {
              display: false,
            },
            position: "right",
            title: {
              display: true,
              text: "AP",
            },
          },
          yPlays: {
            display: false,
          },
          y: {
            type: "linear",
            reverse: true,
            ticks: {
              precision: 0,
            },
            title: {
              display: true,
              text: "Rank",
            },
          },
        },

        elements: {
          line: {
            fill: false,
            tension: 0.2,
          },
          point: {
            radius: 0,
          },
        },
      }}
    />
  );
};

export default RankGraph;
