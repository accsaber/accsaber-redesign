import type { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getSkills } from "~/lib/components/skillTriangle";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");
  if (!/^[0-9]{1,17}$/.test(params.userId))
    throw new Response("Player Not Found", { status: 404 });

  const scale = 100;
  const strokeWidth = 2.5;

  const skills: number[] = await getSkills(params.userId);

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

  const skillPath = `M ${points
    .map((point) => `${point.x},${point.y}`)
    .join("L ")} Z`;

  return new Response(
    `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${corners.join(" ")}">
      ${guidePaths.join("")}
      <path d="${skillPath}" stroke-width="${strokeWidth}" stroke-linejoin="round" fill="#2563eb55" stroke="#2563eb">
        

    <animate attributeName="d" dur="0.8s"  calcMode="spline" keySplines="0.2 0 0.2 1" values="M ${points
      .map(() => `0, 0`)
      .join(" L")} Z; ${skillPath}" />
    </path>
      
    </svg>`,
    {
      headers: [["content-type", "image/svg+xml"]],
    }
  );
};
