import { AxiosError } from "axios";
import { json } from "stream/consumers";
import invariant from "tiny-invariant";
import { Player } from "../interfaces/api/player";
import { getCategories } from "./category";
import apiFetcher, { client } from "./fetcher";

export const updatePlayerCache = async (category = "overall") => {
  if (!client.isOpen) await client.connect();

  try {
    const { data } = await apiFetcher.get<Player[]>(
      `categories/${category}/standings`
    );

    const transaction = client.multi();
    for (const player of data) {
      transaction.hSet(
        `accsaber:players:${category}`,
        player.playerId,
        JSON.stringify(player)
      );
      transaction.zAdd(`accsaber:standings:${category}`, {
        score: player.rank,
        value: player.playerId,
      });
    }
    await transaction.exec();

    return true;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err);
      return false;
    }
    throw err;
  }
};

export const getStandings = async (
  category = "overall",
  page = 0,
  pageSize = 50
) => {
  if (!client.isOpen) await client.connect();

  if (!(await client.exists(`accsaber:standings:${category}`)))
    await updatePlayerCache(category);

  return client.zRange(
    `accsaber:standings:${category}`,
    page * pageSize,
    page * pageSize + pageSize
  );
};

export const getPlayer = async (playerId: string, category = "overall") => {
  if (!client.isOpen) await client.connect();
  invariant(
    category == "overall" || (await getCategories()).has(category),
    "invalid category id"
  );

  if (!(await client.exists(`accsaber:standings:${category}`)))
    await updatePlayerCache(category);

  const dbPlayer = await client.hGet(`accsaber:players:${category}`, playerId);

  return dbPlayer ? JSON.parse(dbPlayer) : null;
};
