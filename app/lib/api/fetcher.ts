import axios from "axios";
import config from "./config";
import { createClient } from "redis";
import { getPlayer } from "./player";

const rawClient = createClient({
  url: config.redisURL,
});

export const client = new Proxy(rawClient, {
  get(_, p) {
    return () => {
      throw new Error(`Redis client ${String(p)} called`);
    };
  },
});

const apiFetcher = axios.create({
  baseURL: config.apiURL,
  validateStatus: () => true,
});

export const getProfile = getPlayer;

export const get = async (url: string, expiry = 60 * 60) => {
  const { data } = await apiFetcher.get<ArrayBuffer>(url, {
    responseType: "arraybuffer",
  });
  return data;
};

export const getJSON = <T>(url: string, headersObject?: Headers) => {
  return apiFetcher.get<T>(url).then((i) => {
    return i.data;
  });
};

export default apiFetcher;
