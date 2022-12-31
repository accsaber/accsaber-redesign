import invariant from "tiny-invariant";
import { use } from "react";
import ApGraph from "../Components/ApGraph";
import PageHeader from "~/app/Components/PageHeader";
import { sdk } from "~/lib/api/gql";

export default function ApGraphPage({
	params,
	searchParams,
}: {
	params?: Record<string, string>;
	searchParams?: Record<string, string | string[]>;
}) {
	invariant(params?.playerId, "Missing player id parameter");

	const {
		categories,
		accSaberScores,
		playerDatum: profile,
	} = use(sdk.ApGraphPage({ playerId: params.playerId }));

	return (
		<>
			<PageHeader
				image={`avatars/${profile?.playerId}.jpg`}
				navigation={[
					{
						href: `/profile/${profile?.playerId}/overall/scores`,
						label: "Overall",
						isCurrent: false,
					},
					...(categories?.nodes ?? [])?.map((ncategory) => ({
						href: `/profile/${profile?.playerId}/${ncategory.categoryName}/scores`,
						label: ncategory.categoryDisplayName ?? "",
						isCurrent: false,
					})),
					{
						href: `/profile/${profile?.playerId}/ap-graph`,
						label: "AP Graph",
						isCurrent: true,
					},
				]}
			>
				{profile?.playerName}&apos;s Profile
			</PageHeader>

			<div className="w-full max-w-screen-lg p-6 mx-auto h-[32rem] flex-1">
				<ApGraph
					data={accSaberScores?.nodes ?? []}
					categories={
						(categories?.nodes as {
							categoryName: string;
							categoryDisplayName: string;
						}[]) ?? []
					}
				/>
			</div>
		</>
	);
}
