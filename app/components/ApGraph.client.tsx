"use client";
import { type Category } from "~/lib/interfaces/api/category";
import { type PlayerScore } from "~/lib/interfaces/api/player-score";
import { Line } from "react-chartjs-2";
import {
  LineElement,
  Chart,
  LinearScale,
  PointElement,
  Legend,
} from "chart.js";
import { useEffect, useMemo, useRef } from "react";
import type { ApDataPointFragment } from "$gql";

export interface CategoryScoreData extends Category {
  scores: PlayerScore[];
}

const ApGraph = ({
  data,
  categories,
}: {
  data: ApDataPointFragment[];
  categories: {
    categoryName: string;
    categoryDisplayName: string;
  }[];
}) => {
  Chart.register(LineElement, LinearScale, PointElement, Legend); // I hate every single thing about this but we get errors otherwise
  const ref = useRef();

  const datasets = useMemo(
    () =>
      categories.map((i, n) => {
        return {
          label: i.categoryDisplayName,
          data: data
            .filter((c) => c.categoryName === i.categoryName)
            .map(({ ap }, n) => [n + 1, ap]),
          borderColor: ["#34d399", "#2563eb", "#d946ef"][n],
        };
      }),
    [data, categories]
  );

  return (
    <Line
      ref={ref}
      data={{
        labels: categories.map((i) => i.categoryDisplayName),
        datasets,
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
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
            type: "linear",
            title: {
              display: true,
              text: "Nth Score",
            },
          },
          y: {
            type: "linear",
            title: {
              display: true,
              text: "Raw AP",
            },
          },
        },
      }}
    />
  );
};

export default ApGraph;
