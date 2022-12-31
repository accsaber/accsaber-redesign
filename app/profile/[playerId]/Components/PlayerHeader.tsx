import Link from "next/link";
import { Suspense, use } from "react";
import PlayerName from "./PlayerName";
import { language } from "~/lib/api/config";
import { getPlayer } from "~/lib/api/fetcher";
import getCampaignStatus, { getHighestLevel } from "~/lib/api/campaign";
import PageHeader from "~/app/Components/PageHeader";
import LoadingSpinner from "~/app/Components/LoadingSpinner";
import Title from "~/app/Components/Title";
import { notFound } from "next/navigation";
import CDNImage from "~/app/Components/CDNImage";
import { sdk } from "~/lib/api/gql";
import RankGraph from "./RankGraph";
import SkillTriangle from "./SkillTriangle";

export default function PlayerHeader({
	playerId,
	category = "overall",
}: {
	playerId: string;
	category: string;
}) {
	const [profile, campaignStatus] = use(
		Promise.all([
			getPlayer(playerId, category).catch((error) => {
				throw notFound();
			}),
			getCampaignStatus(playerId),
		]),
	);
	const categoryNumber =
		category === "overall"
			? -1
			: ["true", "standard", "tech"].indexOf(category) + 1;
	const {
		playerRankHistories,
		categories: categoriesEdge,
		categoryAccSaberPlayers: categoryStats,
	} = use(sdk.PlayerLayout({ playerId, category: categoryNumber }));

	const categories = categoriesEdge?.nodes ?? [];

	return (
		<>
			<PageHeader
				transparent
				image={`avatars/${playerId}.jpg`}
				navigation={[
					{
						href: `/profile/${profile.playerId}/overall/scores`,
						label: "Overall",
						isCurrent: category === "overall",
					},
					...categories.map((node) => ({
						href: `/profile/${profile.playerId}/${node.categoryName}/scores`,
						label: node.categoryDisplayName ?? "",
						isCurrent: category === node.categoryName,
					})),
					{
						href: `/profile/${profile.playerId}/ap-graph`,
						label: "AP Graph",
						isCurrent: false,
					},
				]}
			>
				{profile.playerName}&apos;s Profile
			</PageHeader>
			<Title>{`${profile.playerName}'s Profile`}</Title>
			<div className="relative overflow-hidden bg-neutral-100 dark:bg-black/20">
				<div className="h-16" />
				<CDNImage
					src={`avatars/${profile.playerId}.jpg`}
					className="absolute top-0 left-0 object-cover w-full h-full opacity-20 blur-3xl"
					alt=""
					width={184}
					height={184}
				/>
				<div
					className={[
						"flex gap-6 py-4 text-neutral-800 dark:text-neutral-200 items-center",
						"max-w-screen-lg mx-auto px-4 flex-wrap justify-center relative",
					].join(" ")}
				>
					<CDNImage
						src={`avatars/${profile.playerId}.jpg`}
						alt={`${profile.playerName}'s profile`}
						width={128}
						height={128}
						className={[
							"w-32 h-32 rounded-full shadow-lg",
							campaignStatus && campaignStatus.length > 0 ? "border-4" : "",
							[
								"border-[#3498db] shadow-[#3498db]/50",
								"border-[#f1c40f] shadow-[#f1c40f]/50",
								"border-[#1abc9c] shadow-[#1abc9c]/50",
								"border-[#9c59b6] shadow-[#9c59b6]/50",
							][getHighestLevel(campaignStatus ?? [])],
						].join(" ")}
					/>

					<div className="flex flex-col justify-center flex-1">
						<div className="">
							<h1 className="text-2xl font-semibold">
								<Suspense fallback={profile.playerName}>
									<PlayerName>{profile}</PlayerName>
								</Suspense>
							</h1>
							<div className="flex flex-1 gap-1 text-2xl">
								<div>
									<Link
										prefetch={false}
										href={`/leaderboards/${category}?page=${
											Math.floor(profile.rank / 50) + 1
										}`}
									>
										#{profile.rank.toLocaleString(language)}
									</Link>
								</div>

								{profile.rankLastWeek !== profile.rank ? (
									<div
										className={[
											profile.rankLastWeek > profile.rank
												? "text-green-600 dark:text-green-400"
												: "",
											profile.rankLastWeek < profile.rank
												? "text-red-600 dark:text-red-400"
												: "",
										]
											.join(" ")
											.trim()}
									>
										{profile.rankLastWeek > profile.rank ? "+" : ""}
										{profile.rankLastWeek - profile.rank}
									</div>
								) : (
									""
								)}
							</div>
						</div>
						<div className="text-xl">
							{profile.ap.toLocaleString(language, {
								maximumFractionDigits: 2,
							})}{" "}
							AP
						</div>
						<div className="text-xl">{profile.rankedPlays} ranked plays</div>
						<div className="text-xl">{profile.hmd}</div>
					</div>
					<div className="w-72 h-72">
						{/* <Suspense
							fallback={
								<div className="flex items-center justify-center h-full dark:text-neutral-100">
									<LoadingSpinner />
								</div>
							}
						></Suspense> */}
						<SkillTriangle categories={categories} key='skills'>
							{categoryStats?.nodes ?? []}
						</SkillTriangle>
					</div>
				</div>
				<div className="relative h-64 max-w-screen-lg px-8 pb-12 mx-auto">
					<RankGraph history={playerRankHistories?.nodes ?? []} />
				</div>
			</div>
		</>
	);
}
