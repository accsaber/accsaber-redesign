import Link from "next/link";
import { language } from "~/lib/api/config";
import type { Player } from "~/lib/interfaces/api/player";
import PlayerAvatar from "./PlayerAvatar";

const PlayerResult = ({
  player: profile,
  onClick,
}: {
  player: Player;
  onClick?: Parameters<typeof Link>["0"]["onClick"];
}) => (
  <Link
    href={`/profile/${profile.playerId}/overall/scores`}
    className={[
      "hover:bg-neutral-100",
      "dark:hover:bg-neutral-800",
      "p-4",
      "flex items-center",
      "gap-3",
      "text-neutral-800",
      "dark:text-neutral-200",
    ].join(" ")}
    onClick={onClick}
  >
    <PlayerAvatar
      profile={profile}
      width={56}
      height={56}
      className="relative w-14 h-14 overflow-hidden rounded-lg shadow-lg"
    />
    <div className="flex flex-col justify-center">
      <div className="text-xl">{profile.playerName}</div>
      <div className="text-lg opacity-60">
        #{profile.rank} /{" "}
        {profile.ap.toLocaleString(language, { maximumFractionDigits: 2 })}AP
      </div>
    </div>
  </Link>
);

export default PlayerResult;
