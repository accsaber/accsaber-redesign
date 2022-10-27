import { Category } from "../interfaces/api/category";
import { PlayerScore } from "../interfaces/api/player-score";
import { json } from "./fetcher";
import getPlayerScores from "./scores";

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

const applyCurve = (x: number) => {
  const y1 = 0.1;
  const x1 = 15;
  const k = 0.4;
  const x0 = -((Math.log(((1 - y1) / y1) * Math.pow(Math.E, k * x1)) - 1) / k);
  return (1 + Math.pow(Math.E, -k * x0)) / (1 + Math.pow(Math.E, k * (x - x0)));
};

export async function getSkills(userId: string) {
  const [categories, scores] = await Promise.all([
    json<Category[]>("categories"),
    getPlayerScores(userId),
  ]);

  const skills: number[] = [];

  for (const category of categories) {
    const categoryScores = scores.filter(
      (score) => score.categoryDisplayName == category.categoryDisplayName
    );
    skills.push(weightedAverage(categoryScores));
  }

  return skills;
}
