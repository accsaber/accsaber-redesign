import { Line, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Category } from "../interfaces/api/category";

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

  console.log(skills);

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
          },
        ],
      }}
      width={75}
      height={75}
    />
  );
};

export default SkillTriangle;
