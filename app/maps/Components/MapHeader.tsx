import { use } from "react";
import PageHeader from "~/app/Components/PageHeader";
import { json } from "~/lib/api/fetcher";
import { type RankedMap } from "~/lib/interfaces/api/ranked-map";
import scoresaberLogo from "~/public/images/scoresaber.svg";
import Image from "next/image";
import DifficultyLabel from "~/app/Components/DifficultyLabel";
import Complexity from "~/app/Components/Complexity";

const MapHeader = ({ mapId }: { mapId: string }) => {
  const map = use(json<RankedMap>(`ranked-maps/${encodeURIComponent(mapId)}`));

  return (
    <>
      <PageHeader
        image={`https://cdn.accsaber.com/covers/${map.songHash.toUpperCase()}.png`}
        iconRounded={false}
        actionButton={
          <div className="flex">
            <a
              href={`https://beatsaver.com/maps/${map.beatSaverKey}`}
              className="block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              aria-label="Download"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </a>
            <a
              href={`https://scoresaber.com/leaderboard/${map.leaderboardId}`}
              className="block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              aria-label="ScoreSaber"
            >
              <Image
                src={scoresaberLogo}
                alt="Map Leaderboard on ScoreSaber"
                className="h-6"
                width={24}
                height={24}
              />
            </a>
          </div>
        }
      >
        {map.songAuthorName} - {map.songName}
      </PageHeader>
      <div className="relative overflow-hidden bg-neutral-100 dark:bg-black/20">
        <Image
          src={`https://cdn.accsaber.com/covers/${map.songHash.toUpperCase()}.png`}
          alt=""
          className="absolute top-0 left-0 object-cover w-full h-full opacity-20 blur-3xl"
          width={256}
          height={256}
        />
        <div
          className={[
            "flex gap-6 py-8 text-neutral-800 dark:text-neutral-200 items-center",
            "max-w-screen-lg mx-auto px-4",
          ].join(" ")}
        >
          <div className="flex w-32 h-32 overflow-hidden rounded-lg shadow-lg aspect-square">
            <Image
              src={`https://cdn.accsaber.com/covers/${map.songHash.toUpperCase()}.png`}
              alt=""
              width={256}
              height={256}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="flex gap-2 text-2xl font-bold">
              {map.songAuthorName} - {map.songName}
              {map.songSubName ? <small>{map.songSubName}</small> : ""}
              <DifficultyLabel>{map.difficulty}</DifficultyLabel>
            </h1>
            <h2 className="text-xl">{map.categoryDisplayName}</h2>
            <h2 className="text-xl">
              Mapped by <strong>{map.levelAuthorName}</strong>
            </h2>
            <Complexity>{map.complexity}</Complexity>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapHeader;
