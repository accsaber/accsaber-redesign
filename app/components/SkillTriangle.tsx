"use client";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import type { CategoryInfoFragment, SkillLevelFragment } from "$gql";

const SkillTriangle: React.FC<{
  skills: SkillLevelFragment[];
  categories: CategoryInfoFragment[];
}> = ({ skills, categories }) => {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  const lineColour = "#7e7e7e22";

  return (
    <Radar
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            max: 100,
            min: 0,
            ticks: { display: false },
            angleLines: {
              color: lineColour,
            },
            grid: {
              color: lineColour,
            },
          },
        },
      }}
      data={{
        labels: skills.map(
          (i) => i.categoryByCategoryName?.categoryDisplayName ?? i.categoryName
        ),
        datasets: [
          {
            data: skills.map((i) => i.skillLevel),
            label: "Skill level",
            borderColor: "#2563eb",
            backgroundColor: "#2563eb33",
          },
        ],
      }}
      width={75}
      height={75}
    />
  );
};

export default SkillTriangle;
