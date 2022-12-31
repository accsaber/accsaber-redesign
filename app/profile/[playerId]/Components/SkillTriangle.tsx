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
import {
	CategoryInfoFragment,
	SkillLevelFragment,
} from "~/lib/__generated__/gql";

const SkillTriangle: React.FC<{
	children: SkillLevelFragment[];
	categories: CategoryInfoFragment[];
}> = ({ children: skills, categories }) => {
	ChartJS.register(
		RadialLinearScale,
		PointElement,
		LineElement,
		Filler,
		Tooltip,
		Legend,
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
