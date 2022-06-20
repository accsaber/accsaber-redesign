import { AxiosError } from "axios";
import type { Player } from "../interfaces/api/player";
import type { PlayerScore } from "../interfaces/api/player-score";
import apiFetcher, { client } from "./fetcher";

export const updatePlayerCache = async (category = "overall") => {
  const { data, status } = await apiFetcher.get<Player[]>(
    `categories/${category}/standings`
  );

  if (status !== 200) return false;

  const transaction = client.multi();
  for (const player of data) {
    transaction.hSet(
      `accsaber:players:${category}`,
      player?.playerId ?? "Unknown Player",
      JSON.stringify(player)
    );
    transaction.expire(`accsaber:players:${category}`, 86400);
    transaction.zAdd(`accsaber:standings:${category}`, {
      score: player.rank,
      value: player.playerId,
    });
    transaction.expire(`accsaber:standings:${category}`, 86400);
  }
  await transaction.exec();

  return true;
};

export const getStandings = async (
  category = "overall",
  page = 0,
  pageSize = 50
) => {
  if (!(await client.exists(`accsaber:standings:${category}`))) {
    if (!(await updatePlayerCache(category))) {
      return null;
    }
  }

  return client.zRange(
    `accsaber:standings:${category}`,
    page * pageSize,
    page * pageSize + pageSize
  );
};

export const getPlayer = async (playerId: string, category = "overall") => {
  if (!(await client.exists(`accsaber:standings:${category}`)))
    await updatePlayerCache(category);

  const dbPlayer = await client.hGet(`accsaber:players:${category}`, playerId);

  return dbPlayer ? (JSON.parse(dbPlayer) as Player) : null;
};

export const getPlayerScores = async (
  playerId: string,
  category = "overall",
  reverse = true
): Promise<{ scores: PlayerScore[]; count: number }> => {
  if (category !== "overall") return { scores: [], count: 0 };

  const key = `accsaber:scores:player:${playerId}:${category}`;

  const count = await client.zCard(key);
  const rawScoreList = await client.zRange(key, 0, count);
  rawScoreList.reverse();

  if (count === 0) {
    const { data, status, statusText } = await apiFetcher.get<PlayerScore[]>(
      `players/${playerId}/scores`
    );

    if (status !== 200) throw new Response(statusText, { status, statusText });

    const transaction = client.multi();

    transaction.zAdd(
      key,
      (data ?? []).map((score) => ({
        score: score.weightedAp ?? score.ap,
        value: JSON.stringify(score),
      }))
    );

    transaction.expire(key, 86400);

    await transaction.execAsPipeline();
    return await getPlayerScores(playerId, category, reverse);
  }

  if (!Array.isArray(rawScoreList)) return { scores: [], count: 0 };
  return {
    scores: rawScoreList
      .filter((i) => typeof i === "string")
      .map((i) => JSON.parse(i as string) as PlayerScore),
    count,
  };
};

export const getPlayerRankHistory = async (
  playerId: string,
  category = "standard"
) => {
  const key = `accsaber:history:${playerId}`;

  const dbHistory = await client.hGet(key, category);
  if (!dbHistory) {
    const { data } = await apiFetcher.get<{ [date: string]: number }>(
      `/players/${playerId}${
        category !== "overall" ? `/${category}` : ""
      }/recent-rank-history`
    );

    const transaction = client.multi();
    transaction.hSet(key, category, JSON.stringify(data));
    transaction.expire(key, 86400);
    await transaction.execAsPipeline();
    return data;
  } else {
    return JSON.parse(dbHistory) as { [date: string]: number };
  }
};
