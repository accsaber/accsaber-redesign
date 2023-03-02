import type { Player } from "../interfaces/api/player";
import type { PlayerScore } from "../interfaces/api/player-score";
import CampaignStatus from "../interfaces/campaign/campaignStatus";
import { getCategories } from "./category";
import apiFetcher, { client, getJSON } from "./fetcher";

export const playerExpiry = 86400; // 1 hour
export const refreshAfter = 120; // 2 minutes

export const getStandings = async (
  category = "overall",
  page = 0,
  pageSize = 50
) => {
  return await getJSON<Player[]>(`categories/${category}/standings`).then(
    (data) => ({
      length: data.length,
      standings: data.splice(page * pageSize, pageSize),
    })
  );
};

export const getPlayerCampaignLevel = async (
  playerId: string,
  campaignId = 0
) =>
  apiFetcher
    .get<CampaignStatus[]>(
      `https://campaigns.accsaber.com/${campaignId}/player-campaign-infos/${playerId}`
    )
    .then((r) => r.data);

export const getPlayer = (playerId: string, category = "overall") => {
  return getJSON<Player>(`players/${playerId}/${category}`);
};

export const getPlayerScores = async (
  playerId: string,
  category = "overall",
  reverse = true
): Promise<{ scores: PlayerScore[]; count: number }> => {
  const scores = await getJSON<PlayerScore[]>(
    `players/${playerId}${category == "overall" ? "" : `/${category}`}/scores`
  );

  if (reverse) scores.reverse();

  return {
    scores,
    count: scores.length,
  };
};

export const getPlayerRankHistory = (playerId: string, category = "standard") =>
  apiFetcher
    .get<{ [date: string]: number }>(
      `/players/${playerId}${
        category !== "overall" ? `/${category}` : ""
      }/recent-rank-history`
    )
    .then((i) => i.data);
