import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import config from "~/lib/api/config";

const scales = [1, 1.5, 2];

interface CDNSource {
  src: string;
  width: number;
  height: number;
}

interface CDNImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  width: number;
  height: number;
}

const CDNImage = (props: CDNImageProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...props} src={new URL(props.src, config.cdnURL).toString()} />
  );
};

export default CDNImage;
