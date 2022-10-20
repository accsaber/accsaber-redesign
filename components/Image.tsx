import { type JSXInternal } from "preact/src/jsx.d.ts";
import { resize } from "../lib/cdn.ts";

export enum Size {
  AVATAR,
  THUMBNAIL,
}

const sizes = new Map<Size, number>([
  [Size.THUMBNAIL, 80],
  [Size.AVATAR, 256],
]);

interface ImageElementProps
  extends JSXInternal.HTMLAttributes<HTMLImageElement> {
  size?: Size;
  width?: number;
  height?: number;
}
const Img = (props: ImageElementProps) => {
  const formats = ["webp", "jpeg", "png"];
  const ratios = [1, 1.5, 2];
  const width = props.size ? sizes.get(props.size) : props.width;
  const height = props.size ? sizes.get(props.size) : props.height;
  return (
    <picture>
      {formats.map((format) => (
        <source
          srcSet={ratios
            .map(
              (i) =>
                resize({
                  url: props.src,
                  width: width && width * i,
                  height: height && height * i,
                  type: format,
                }) + ` ${i}x`
            )
            .join(", ")}
          type={`image/${format}`}
        />
      ))}
      <img
        {...props}
        src={resize({
          url: props.src,
          width,
          height,
          type: "jpeg",
        })}
      />
    </picture>
  );
};

export default Img;
