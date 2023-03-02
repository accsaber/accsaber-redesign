import type { Category } from "../interfaces/api/category";
import apiFetcher from "./fetcher";

export const getCategories = async () => {
  const { data } = await apiFetcher.get<Category[]>("categories");

  return new Map(data.map((i) => [i.categoryName, i]));
};
