import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import config from "./config";
import { commandOptions, createClient } from "redis";
import type { Player } from "../interfaces/api/player";
import ms from "ms";

export const client = createClient({
  url: config.redisURL,
});

export const swrFetcher = async <T>(config: AxiosRequestConfig) =>
  (await apiFetcher(config)).data;

const apiFetcher = axios.create({
  baseURL: config.apiURL,
});

export const getProfile = async (id: string) => {
  const { data: player } = await apiFetcher.get<Player>(`/players/${id}`);
  return player;
};

export const get = async <T>(url: string, headersObject?: Headers) => {
  const key = `accsaber:${url}`;
  if (!client.isOpen) await client.connect();
  const revalidate = async () => {
    const dataStartTime = performance.now();
    const { data } = await apiFetcher.get<T>(url);
    headersObject?.append(
      "server-timing",
      `fetch;desc="fetch:${url
        .replace(/\\/g, "\\\\")
        .replace(/\//g, "\\/")}";dur=${performance.now() - dataStartTime}`
    );
    await client.set(
      key,
      JSON.stringify({
        lastModified: Date.now(),
        data,
      })
    );

    return data;
  };

  const readStartTime = performance.now();
  const dbData = await client.get(commandOptions({ isolated: true }), key);
  headersObject?.append(
    "server-timing",
    `db;desc="db:${url.replace(/\\/g, "\\\\").replace(/\//g, "\\/")}";dur=${
      performance.now() - readStartTime
    }`
  );
  if (!dbData) return await revalidate();

  const { lastModified, data } = JSON.parse(dbData) as {
    lastModified: number;
    data: T;
  };

  if (Date.now() - lastModified > ms("5 minutes")) revalidate();

  return data ?? (await revalidate());
};

export default apiFetcher;
