import axios from "axios";
import config from "./config";
import { commandOptions, createClient } from "redis";
import type { Player } from "../interfaces/api/player";
import { getPlayer } from "./player";

export const client = createClient({
  url: config.redisURL,
});
client.on("connect", () => console.log("Redis connected"));
client.on("reconnecting", () => console.log("Redis reconnecting"));
client.on("ready", () => console.log("Redis ready"));
client.on("error", function (err) {
  console.error("Redis error:", err);
});

client.connect();

const apiFetcher = axios.create({
  baseURL: config.apiURL,
  validateStatus: () => true,
});

export const getProfile = getPlayer;

export const get = async (url: string, expiry = 86400) => {
  const key = `accsaber:cache:${url}`;

  const revalidate = async () => {
    console.log(`Revalidating ${key}`);
    const { data } = await apiFetcher.get<ArrayBuffer>(url, {
      responseType: "arraybuffer",
    });
    client.set(key, Buffer.from(data));
    client.expire(key, expiry);
    return data;
  };

  let data =
    (await client.get(commandOptions({ returnBuffers: true }), key)) ??
    (await revalidate());

  return data;
};
export const getJSON = async <T>(url: string, headersObject?: Headers) => {
  const data = Buffer.from(await get(url)).toString("utf-8");
  let parsedData = JSON.parse(data) as T;
  return parsedData;
};

export default apiFetcher;
