import NextImage from "next/image";
import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

const allowedTypes = ["webp", "heif", "jpeg"];

const scales = [1, 1.5, 2];

interface CDNSource {
  src: string;
  width: number;
  height: number;
}

const getImaginaryURL = (image: CDNSource, format: string) => {
  const targetPath = new URL("https://cdn.accsaber.com/imaginary/resize");
  targetPath.searchParams.set("file", image.src);
  targetPath.searchParams.set("width", image.width.toString());
  targetPath.searchParams.set("format", format);

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
