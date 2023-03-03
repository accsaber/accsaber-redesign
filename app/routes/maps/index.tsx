import type { MapRowFragment, RankedMapsQuery } from "$gql";
import { BeatMapsOrderBy, RankedMapsDocument } from "$gql";
import GQLSortButton from "@/GQLSortButton";
import MapRow from "@/MapRow";
import PageHeader from "@/PageHeader";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useRef } from "react";
import config from "~/lib/api/config";
import { gqlClient } from "~/lib/api/gql";

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);

  const headers = new Headers();
  headers.append("Cache-Control", "max-age=60, stale-while-revalidate=6400");

  const sortByParam = (searchParams.get("sortBy") ??
    "DateRankedDesc") as keyof typeof BeatMapsOrderBy;
  return json(
    await gqlClient.request(RankedMapsDocument, {
      orderBy: BeatMapsOrderBy[sortByParam] ?? BeatMapsOrderBy.DateRankedAsc,
    }),
    { headers }
  );
};

export const meta: MetaFunction = () => ({
  title: "AccSaber Ranked Maps",
  description: "Every ranked map on AccSaber",
});

export default function RankedMapsPage() {
  const { beatMaps: maps, categories } = useLoaderData<RankedMapsQuery>();
  const [searchParams] = useSearchParams();
  const downloadMenu = useRef<HTMLDialogElement>();
  const columns: [(keyof typeof BeatMapsOrderBy)[] | null, string, number?][] =
    [
      [null, "Song Name", 2],
      [null, "Difficulty"],
      [null, "Mapper"],
      [["CategoryIdAsc", "CategoryIdDesc"], "Category"],
      [["ComplexityAsc", "ComplexityDesc"], "Complexity"],
      [["DateRankedAsc", "DateRankedDesc"], "Date Ranked"],
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
        ref={(self) => self && (downloadMenu.current = self)}
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
            {categories?.nodes.map(({ categoryName, categoryDisplayName }) => (
              <div key={categoryName}>
                <a
                  href={new URL(
                    `playlists/${categoryName}`,
                    config.apiURL
                  ).toString()}
                  className="py-2 px-3 block w-max shadow-lg bg-blue-600 text-white rounded shadow-blue-600/50"
                >
                  Download {categoryDisplayName} playlist
                </a>
              </div>
            ))}
          </div>
        </div>
      </dialog>
      <div className="w-full max-w-screen-lg px-4 py-8 mx-auto prose dark:prose-invert">
        <table>
          <thead>
            <tr>
              {columns.map(([value, friendly, colSpan], n) => (
                <th key={n} colSpan={colSpan}>
                  {value ? (
                    <GQLSortButton
                      values={value}
                      currentValue={searchParams.get("sortBy") ?? undefined}
                    >
                      {friendly}
                    </GQLSortButton>
                  ) : (
                    friendly
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {maps?.nodes?.map((map) => (
              <MapRow map={map as MapRowFragment} key={map.leaderboardId} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
