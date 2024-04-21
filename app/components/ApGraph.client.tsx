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
import { useEffect, useMemo, useRef, useState } from "react";
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

  const [useWeightedAp, setUseWeighted] = useState(false)
  const [showZeroAP, setShowZeroAP] = useState(true)

  const datasets = useMemo(
    () =>
      categories.map((i, n) => {
        return {
          label: i.categoryDisplayName,
          data: data
            .filter((c) => c.categoryName === i.categoryName)
            .map(({ ap, weightedAp }, n) => [n + 1, useWeightedAp ? weightedAp : ap])
            .filter(([_, y]) => showZeroAP || (y ?? 0) > 0.01),
          borderColor: ["#34d399", "#2563eb", "#d946ef"][n],
        };
      }),
    [data, categories, useWeightedAp, showZeroAP]
  );

  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        <label className="flex gap-2 items-center">
          <input type="checkbox" checked={useWeightedAp} onChange={() => setUseWeighted(!useWeightedAp)} />
          Use Weighted AP
        </label>
        <label className="flex gap-2 items-center" style={{
          display: useWeightedAp ? undefined : "none"
        }}>
          <input type="checkbox" checked={showZeroAP} onChange={() => setShowZeroAP(!showZeroAP)} />
          Show 0AP scores
        </label>
      </div>
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
                text: useWeightedAp ? "Weighted AP" : "Raw AP",
              },
            },
          },
        }}
      />
    </>
  );
};

export default ApGraph;
