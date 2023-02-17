import { Link } from "@remix-run/react";
import CDNImage from "./CDNImage";
import Avatar from "boring-avatars";
import { language } from "~/lib/api/config";
import { Player } from "~/lib/interfaces/api/player";

const PlayerResult = ({ player: profile }: { player: Player }) => (
  <Link
    to={`/profile/${profile.playerId}/overall/scores`}
    className={[
      "hover:bg-neutral-100",
      "dark:hover:bg-neutral-800",
      "rounded-2xl",
      "p-4",
      "flex",
      "gap-4",
      "text-neutral-800",
      "dark:text-neutral-200",
    ].join(" ")}
  >
    <div className="relative w-16 h-16 overflow-hidden rounded-full shadow-lg">
      <Avatar name={profile.playerId} size={64} variant="beam" />
      {profile.avatarUrl !==
        "https://cdn.scoresaber.com/avatars/oculus.png" && (
        <CDNImage
          width={64}
          height={64}
          src={`avatars/${profile.playerId}.jpg`}
          className="absolute top-0 left-0"
        />
      )}
    </div>
    <div className="flex flex-col justify-center">
      <div className="text-2xl">{profile.playerName}</div>
      <div className="text-xl opacity-60">
        #{profile.rank} /{" "}
        {profile.ap.toLocaleString(language, { maximumFractionDigits: 2 })}AP
      </div>
    </div>
  </Link>
);

export default PlayerResult;
