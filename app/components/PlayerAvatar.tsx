import type { SVGProps, ImgHTMLAttributes } from "react";
import BoringAvatar from "boring-avatars";
import CDNImage from "./CDNImage";

type Variant = Parameters<typeof BoringAvatar>[0]["variant"];

interface AvatarProps extends SVGProps<SVGSVGElement> {
  profile: {
    playerId: string;
    playerName: string;
  };
  variant?: Variant;
  width?: number;
  height?: number;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
}

const PlayerAvatar = (props: AvatarProps) => (
  <svg
    viewBox="0 0 120 120"
    preserveAspectRatio="xMidYMid slice"
    {...{
      ...props,
      profile: undefined,
      highestLevel: undefined,
      loading: undefined,
    }}
  >
    <BoringAvatar
      size={120}
      square
      variant={props.variant ?? "beam"}
      name={props.profile.playerId}
    />

    {props.profile.playerId.startsWith("7") && (
      <foreignObject width={120} height={120} x={0} y={0}>
        <CDNImage
          src={`avatars/${props.profile.playerId}.jpg`}
          alt={`${props.profile.playerName}'s profile`}
          width={props.width ?? 120}
          height={props.height ?? 120}
          className="w-full h-full m-0"
          loading={props.loading}
        />
      </foreignObject>
    )}
  </svg>
);

export default PlayerAvatar;
