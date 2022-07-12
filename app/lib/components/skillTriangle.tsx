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
import type { Category } from "../interfaces/api/category";
import { getCategories } from "../api/category";
import { getPlayerScores } from "../api/player";
import type { PlayerScore } from "../interfaces/api/player-score";

const SkillTriangle: React.FC<{
  children: number[];
  categories: Category[];
}> = ({ children: skills, categories }) => {
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
        labels: categories.map((i) => i.categoryDisplayName),
        datasets: [
          {
            data: skills,

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

const applyCurve = (x: number) => {
  const y1 = 0.1;
  const x1 = 15;
  const k = 0.4;
  const x0 = -((Math.log(((1 - y1) / y1) * Math.pow(Math.E, k * x1)) - 1) / k);
  return (1 + Math.pow(Math.E, -k * x0)) / (1 + Math.pow(Math.E, k * (x - x0)));
};

function weightedAverage(scores: PlayerScore[]): number {
  let averageAp = 0,
    size = 0;

  for (let i = 0; i < scores.length; ++i) {
    const scale = applyCurve(i);
    size += scale;
    averageAp += scores[i].ap * scale;
  }

  averageAp = averageAp / size;

  return Math.max(Math.pow(averageAp / 1100, 1.5) * 100, 0) || 0;
}

export async function getSkills(userId: string) {
  const [categories, { scores }] = await Promise.all([
    getCategories(),
    getPlayerScores(userId),
  ]);

  const skills: number[] = [];

  for (const [, category] of categories) {
    const categoryScores = scores.filter(
      (score) => score.categoryDisplayName == category.categoryDisplayName
    );
    skills.push(weightedAverage(categoryScores));
  }

  return skills;
}

export default SkillTriangle;
