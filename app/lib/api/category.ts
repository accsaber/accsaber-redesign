import type { Category } from "../interfaces/api/category";
import apiFetcher, { client } from "./fetcher";

export const getCategories = async () => {
  const key = "accsaber:categories";
  if (!client.isOpen) await client.connect();

  const cachedCategories = Object.entries(await client.hGetAll(key));

  let categories = new Map(
    cachedCategories.map(([name, category]) => {
      const parsed = JSON.parse(category) as Category;
      return [parsed.categoryName, parsed];
    })
  );

  if (categories.size == 0) {
    console.log(`refreshing category list`);
    const { data } = await apiFetcher.get<Category[]>("/categories");
    for (const category of data) {
      await client.hSet(key, category.categoryName, JSON.stringify(category));
      categories.set(category.categoryDisplayName, category);
    }
  }

  return categories;
};
