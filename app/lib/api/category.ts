import type { Category } from "../interfaces/api/category";
import apiFetcher, { client } from "./fetcher";

const order = ["true", "standard", "tech"];

export const getCategories = async () => {
  const key = "accsaber:categories";
  if (!client.isOpen) await client.connect();

  const cachedCategories = Object.values(await client.hGetAll(key));

  let sorted: [string, Category][] = cachedCategories.map((category) => {
    const parsed = JSON.parse(category) as Category;
    return [parsed.categoryName, parsed];
  });

  sorted.sort(([_a, a], [_b, b]) => {
    const itemValue = (item: Category) =>
      order.indexOf(item.categoryName) ?? order.length;
    return itemValue(a as Category) - itemValue(b as Category);
  });

  let categories = new Map(sorted);

  if (categories.size == 0) {
    console.log(`refreshing category list`);
    const { data } = await apiFetcher.get<Category[]>("/categories");
    data.sort((a, b) => {
      const itemValue = (item: Category) =>
        order.indexOf(item.categoryName) ?? order.length;
      return itemValue(a as Category) - itemValue(b as Category);
    });
    for (const category of data) {
      const transaction = client.multi();
      transaction.hSet(key, category.categoryName, JSON.stringify(category));
      transaction.expire(key, 86400);
      await transaction.execAsPipeline();
      categories.set(category.categoryDisplayName, category);
    }
  }

  return categories;
};
