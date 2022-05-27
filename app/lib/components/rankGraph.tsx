import { Line } from "react-chartjs-2";
import {
  LineElement,
  Chart,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

const RankGraph: React.FC<{
  children?: never;
  history: [string, number][];
}> = ({ history }) => {
  Chart.register(LineElement, LinearScale, CategoryScale, PointElement);

  return (
    <Line
      data={{
        datasets: [{ data: history, label: "rank", borderColor: "#2563eb" }],
      }}
      color={"red"}
      height={100}
      options={{
        scales: {
          y: {
            reverse: true,
            ticks: {
              precision: 0,
            },
          },
        },
      }}
    />
  );
};

export default RankGraph;
