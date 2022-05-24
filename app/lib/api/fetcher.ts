import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import config from "./config";
import { createClient } from "redis";
import { setupCache, buildStorage } from "axios-cache-interceptor";

const client = createClient({
  url: config.redisURL,
});

client.connect();

const redisStorage = buildStorage({
  async find(key) {
    const result = await client.get(`axios-cache:${key}`);
    return JSON.parse(result ?? "null");
  },

  async set(key, value) {
    await client.set(`axios-cache:${key}`, JSON.stringify(value));
  },

  async remove(key) {
    await client.del(`axios-cache:${key}`);
  },
});

export const swrFetcher = async <T>(config: AxiosRequestConfig) =>
  (await apiFetcher(config)).data;

const apiFetcher = axios.create({
  baseURL: config.apiURL,
});

setupCache(apiFetcher, { storage: redisStorage });

export default apiFetcher;
