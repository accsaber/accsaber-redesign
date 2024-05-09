import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import config from "~/lib/api/config";

const scales = [1, 1.5, 2];

interface CDNSource {
  src: string;
  width: number;
  height: number;
}

export const getImaginaryURL = (image: CDNSource, format?: string) => {
  const targetURL = new URL(image.src, "https://cdn.accsaber.com");
  const isCDN = targetURL.hostname === "cdn.accsaber.com";

  const encodedPath = btoa(
    isCDN
      ? new URL(targetURL.pathname, "http://accsaber-media/").toString()
      : targetURL.toString()
  );

  const targetPath = new URL(
    `o7d/s:${image.width}:${image.height}/${encodedPath}${
      format ? `.${format}` : ""
    }`,
    config.cdnURL
  );

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
      srcSet={[1, 1.5, 2]
        .map(
          (scale) =>
            `${getImaginaryURL(
              {
                src: props.src,
                width: props.width * scale,
                height: props.height * scale,
              },
              "webp"
            )} ${scale}x`
        )
        .join(", ")}
    />
  );
};

export default CDNImage;
