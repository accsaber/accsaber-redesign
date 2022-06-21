import type { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getCategories } from "~/lib/api/category";
import { getPlayerScores } from "~/lib/api/player";
import type { PlayerScore } from "~/lib/interfaces/api/player-score";

function calcSkill(scores: PlayerScore[]): number {
  let averageAp = 0,
    size = 0;

  for (let i = 0; i < scores.length; ++i) {
    const scale = 1 / (i + 1);
    size += scale;
    averageAp += scores[i].ap * scale;
  }

  averageAp = averageAp / size;

  if (averageAp < 460) {
    return Math.max(Math.round(averageAp / 46), 0);
  }
  return Math.max(Math.round((averageAp - 400) / 6), 0);
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");
  if (!/^[0-9]{1,17}$/.test(params.userId))
    throw new Response("Player Not Found", { status: 404 });

  const scale = 100;
  const strokeWidth = 2.5;

  const [categories, { scores }] = await Promise.all([
    getCategories(),
    getPlayerScores(params.userId),
  ]);

  const skills: number[] = [];

  for (const [categoryName, category] of categories) {
    const categoryScores = scores.filter(
      (score) => score.categoryDisplayName == category.categoryDisplayName
    );
    skills.push(calcSkill(categoryScores));
  }

  const points = skills.map((skill, n) => {
    const angle = 2 * Math.PI * (n / skills.length) - Math.PI / 2;
    return {
      x: skill * Math.cos(angle),
      y: skill * Math.sin(angle),
      angle,
    };
  });

  const guideCount = 10;
  const guides: { x: number; y: number }[] = points.map(({ angle }) => ({
    x: Math.cos(angle),
    y: Math.sin(angle),
  }));

  const guidePaths: string[] = guides.map(
    (point) =>
      `<path d="M 0,0 L ${point.x * scale},${
        point.y * scale
      }"  fill="transparent" stroke="#ddd5"/>`
  );

  for (let i = 1; i <= guideCount; ++i) {
    const guideScale = scale * (i / guideCount);
    guidePaths.push(
      `<path d="M ${guides
        .map((point) => `${point.x * guideScale},${point.y * guideScale}`)
        .join("L ")} Z" fill="transparent" stroke="#ddd5"/>`
    );
  }

  const corners: number[] = [
    Math.min(...guides.map((i) => i.x * scale)) - strokeWidth,
    Math.min(...guides.map((i) => i.y * scale)) - strokeWidth,
  ];

  corners.push(
    -corners[0] + Math.max(...guides.map((i) => i.x * scale)) + strokeWidth,
    -corners[1] + Math.max(...guides.map((i) => i.y * scale)) + strokeWidth
  );

  return new Response(
    `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${corners.join(" ")}">
      ${guidePaths.join("")}
      <path d="M ${points
        .map((point) => `${point.x},${point.y}`)
        .join(
          "L "
        )} Z" stroke-width="${strokeWidth}" fill="#2563eb55" stroke="#2563eb"/>
      
    </svg>`,
    {
      headers: [["content-type", "image/svg+xml"]],
    }
  );
};
