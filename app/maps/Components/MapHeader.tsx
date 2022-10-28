import { use } from "react";
import PageHeader from "~/app/Components/PageHeader";
import { json } from "~/lib/api/fetcher";
import { type RankedMap } from "~/lib/interfaces/api/ranked-map";
import {
  ChartSquareBarIcon,
  CloudDownloadIcon,
  MapIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import DifficultyLabel from "~/app/Components/DifficultyLabel";
import Complexity from "~/app/Components/Complexity";
import Title from "~/app/Components/Title";
import BlankBlock from "~/app/Components/BlankBlock";
import LoadingSpinner from "~/app/Components/LoadingSpinner";

const MapHeader = ({ mapId }: { mapId: string }) => {
  const map = use(json<RankedMap>(`ranked-maps/${encodeURIComponent(mapId)}`));

  return (
    <>
      <Title>{`${map.songAuthorName} - ${map.songName}`}</Title>
      <PageHeader
        image={`https://cdn.accsaber.com/covers/${map.songHash.toUpperCase()}.png`}
        iconRounded={false}
        transparent
        hideTitleUntilScrolled
        actionButton={
          <div className="flex">
            <a
              href={`beatsaver://${map.beatSaverKey}`}
              className="block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              aria-label="OneClick Downloads"
            >
              <CloudDownloadIcon className="w-6 h-6" />
            </a>
            <a
              href={`https://beatsaver.com/maps/${map.beatSaverKey}`}
              className="block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              aria-label="Download"
            >
              <MapIcon className="w-6 h-6" />
            </a>
            <a
              href={`https://scoresaber.com/leaderboard/${map.leaderboardId}`}
              className="block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              aria-label="ScoreSaber"
            >
              <ChartSquareBarIcon className="w-6 h-6" />
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
            "flex flex-col md:flex-row gap-6 py-16 text-neutral-800 dark:text-neutral-200 items-center",
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
            <h1 className="flex flex-col gap-2 text-2xl font-bold md:flex-row">
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

export const MapHeaderFallback = () => (
  <div className="relative overflow-hidden bg-neutral-100 dark:bg-black/20">
    <div
      className={[
        "flex flex-col md:flex-row gap-6 py-16 text-neutral-800 dark:text-neutral-200 items-center",
        "max-w-screen-lg mx-auto px-4",
      ].join(" ")}
    >
      <div className="flex items-center justify-center w-32 h-32 overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800 aspect-square text">
        <LoadingSpinner />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="flex flex-col gap-2 text-2xl font-bold md:flex-row">
          <BlankBlock width="20rem" />
          <BlankBlock width="4rem" />
        </h1>
        <div className="text-xl">
          <BlankBlock width="5em" />
        </div>
        <div className="text-xl">
          <BlankBlock width="16rem" />
        </div>
        {/* <div className="w-full h-6 my-1 bg-current rounded opacity-30 animate-pulse" /> */}

        <div className="text-xl">
          <BlankBlock width="100%" />
        </div>
      </div>
    </div>
  </div>
);

export default MapHeader;
