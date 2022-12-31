import PlayerHeader from "../Components/PlayerHeader";

export default function ProfileLayout({
	params,
	children,
}: {
	params: { playerId: string; category: string };
	children: React.ReactNode;
}) {
	return (
		<>
			<PlayerHeader playerId={params.playerId} category={params.category} />
			<div className="max-w-screen-lg py-8 mx-auto">{children}</div>
		</>
	);
}

export const revalidate = 600;
