import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createRef } from "react";
import { getCategories } from "~/lib/api/category";
import config from "~/lib/api/config";
import { getMapList } from "~/lib/api/map";
import MapRow from "~/lib/components/mapRow";
import PageHeader from "~/lib/components/pageHeader";
import SortButton from "~/lib/components/sortButton";
import type { Category } from "~/lib/interfaces/api/category";
import type { RankedMap } from "~/lib/interfaces/api/ranked-map";

export const meta: MetaFunction = ({ data }) => ({
  title: "Ranked Maps | AccSaber",
  description: `Every ranked map on AccSaber`,
});

export const loader: LoaderFunction = async ({ request }) => {
  let maps = await getMapList();
  const categories = [...((await getCategories()).values() ?? [])];
  categories.unshift({
    categoryName: "overall",
    categoryDisplayName: "Overall",
    countsTowardsOverall: false,
    description: "Every ranked map on AccSaber",
  });
  const { searchParams } = new URL(request.url);

  const sortBy = searchParams.get("sortBy");
  const isReversed = searchParams.has("reverse");

  const difficultyToNumber = (difficulty: string) =>
    ["easy", "normal", "hard", "expert", "expertplus"].indexOf(
      difficulty.toLowerCase()
    );

  switch (sortBy) {
    case "complexity":
      maps.sort((a, b) => a[sortBy] - b[sortBy]);
      break;

    case "difficulty":
      maps.sort(
        (a, b) =>
          difficultyToNumber(a.difficulty) - difficultyToNumber(b.difficulty)
      );
      break;

    case "dateRanked":
      maps.sort(
        (a, b) =>
          new Date(a.dateRanked).getTime() - new Date(b.dateRanked).getTime()
      );
      break;

    case "songName":
    case "categoryDisplayName":
    case "levelAuthorName":
      maps.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1));
  }

  if (isReversed) maps.reverse();

  return { maps: maps, categories, count: maps.length };
};

const RankedMapsPage = () => {
  const { maps, categories } = useLoaderData<{
    maps: RankedMap[];
    categories: Category[];
  }>();

  const downloadMenu = createRef<HTMLDialogElement>();

  const columns: [keyof RankedMap | null, string, number?][] = [
    ["songName", "Song Name", 2],
    ["difficulty", "Difficulty"],
    ["levelAuthorName", "Mapper"],
    ["categoryDisplayName", "Category"],
    ["complexity", "Complexity"],
    ["dateRanked", "Date Ranked"],
  ];
  return (
    <>
      <PageHeader
        actionButton={
          <button
            onClick={() => downloadMenu.current?.showModal()}
            className="px-4 py-2 shadow-md bg-white dark:bg-neutral-700 rounded text-inherit"
          >
            Download Playlists
          </button>
        }
      >
        Ranked Maps
      </PageHeader>

      <dialog
        ref={downloadMenu}
        className=" bg-white dark:bg-neutral-900 dark:text-neutral-200 p-0 w-full max-w-md rounded-lg shadow-xl"
      >
        <div className="flex flex-col">
          <h2 className="text-2xl bg-neutral-100 dark:bg-neutral-800 px-6 py-4 flex justify-between">
            Download Playlists
            <button onClick={() => downloadMenu.current?.close()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </h2>
          <div className="flex flex-col p-4 gap-3">
            {categories.map(({ categoryName, categoryDisplayName }) => (
              <div key={categoryName}>
                <a
                  href={`${config.apiURL}playlists/${categoryName}`}
                  className="py-2 px-3 block w-max shadow-lg bg-blue-600 text-white rounded shadow-blue-600/50"
                >
                  Download {categoryDisplayName} playlist
                </a>
              </div>
            ))}
          </div>
        </div>
      </dialog>

      <div className="prose w-full dark:prose-invert max-w-screen-lg mx-auto px-4 py-8">
        <h2>Ranked Maps</h2>
        <table>
          <thead>
            <tr>
              {columns.map(([value, friendly, colSpan], n) => (
                <th key={n} colSpan={colSpan}>
                  {value ? (
                    <SortButton name="sortBy" value={value}>
                      {friendly}
                    </SortButton>
                  ) : (
                    friendly
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {maps.map((map) => (
              <MapRow map={map} key={map.leaderboardId} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RankedMapsPage;
