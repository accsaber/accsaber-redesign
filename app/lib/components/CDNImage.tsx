import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";

const allowedTypes = ["webp", "heif", "jpeg"];

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
    <picture>
      {allowedTypes.map((format) => (
        <source
          key={format}
          srcSet={scales
            .map(
              (scale) =>
                getImaginaryURL(
                  {
                    src: props.src,
                    width: props.width * scale,
                    height: props.height * scale,
                  },
                  format
                ) + ` ${scale}x`
            )
            .join(", ")}
          type={`image/${format}`}
        />
      ))}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
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
      />
    </picture>
  );
};

export default CDNImage;
