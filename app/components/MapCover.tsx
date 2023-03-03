import type { SVGProps, ImgHTMLAttributes } from "react";
import BoringAvatar from "boring-avatars";
import CDNImage from "./CDNImage";

type Variant = Parameters<typeof BoringAvatar>[0]["variant"];

interface CoverProps extends SVGProps<SVGSVGElement> {
  songHash: string;
  variant?: Variant;
  width?: number;
  height?: number;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  alt?: string;
}

const MapCover = (props: CoverProps) => (
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
      variant={props.variant ?? "marble"}
      name={props.songHash.toUpperCase()}
    />

    <foreignObject width={120} height={120} x={0} y={0}>
      <CDNImage
        src={`covers/${props.songHash.toUpperCase()}.png`}
        alt={props.alt ?? ""}
        width={props.width ?? 120}
        height={props.height ?? 120}
        className="w-full h-full m-0"
        loading={props.loading}
      />
    </foreignObject>
  </svg>
);

export default MapCover;
