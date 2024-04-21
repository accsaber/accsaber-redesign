import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import config from "~/lib/api/config";

const scales = [1, 1.5, 2];

interface CDNSource {
  src: string;
  width: number;
  height: number;
}

export const getImaginaryURL = (
  image: CDNSource,
  format = "auto",
  action = "thumbnail"
) => {
  const targetURL = new URL(image.src, "https://cdn.accsaber.com");
  const isCDN = targetURL.hostname === "cdn.accsaber.com";
  const targetPath = new URL(`https://cdn.accsaber.com/imaginary/${action}`);
  if (!isCDN) targetPath.searchParams.set("url", image.src);
  else targetPath.searchParams.set("file", targetURL.pathname);
  targetPath.searchParams.set("width", image.width.toString());
  targetPath.searchParams.set("height", image.height.toString());
  targetPath.searchParams.set("type", format);

  return targetPath;
};

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
    <img
      {...props}
      src={new URL(props.src, config.cdnURL).toString()}
    />
  );
};

export default CDNImage;
