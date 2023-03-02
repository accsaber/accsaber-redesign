import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";

const scales = [1, 1.5, 2];

interface CDNSource {
  src: string;
  width: number;
  height: number;
}

export const getImaginaryURL = (
  image: CDNSource,
  format: string,
  action = "resize"
) => {
  const targetURL = new URL(image.src, "https://cdn.accsaber.com");
  const targetPath = new URL(`https://cdn.accsaber.com/imaginary/${action}`);
  if (targetURL.hostname === "cdn.accsaber.com")
    targetPath.searchParams.set("file", targetURL.pathname);
  else targetPath.searchParams.set("url", image.src);
  targetPath.searchParams.set("width", image.width.toString());
  targetPath.searchParams.set("height", image.height.toString());
  targetPath.searchParams.set("type", format);
  if (format == "jpeg") targetPath.searchParams.set("quality", "80");

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
      src={getImaginaryURL(
        {
          src: props.src,
          width: props.width,
          height: props.height,
        },
        "jpeg"
      ).toString()}
      srcSet={scales
        .map(
          (scale) =>
            getImaginaryURL(
              {
                src: props.src,
                width: props.width * scale,
                height: props.height * scale,
              },
              "webp"
            ) + ` ${scale}x`
        )
        .join(", ")}
    />
  );
};

export default CDNImage;
