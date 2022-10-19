import { type JSXInternal } from "https://esm.sh/v94/preact@10.10.6/src/jsx.d.ts";
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
  const formats = ["jpeg", "png", "webp", "avif"];
  const width = props.size ? sizes.get(props.size) : props.width;
  const height = props.size ? sizes.get(props.size) : props.height;
  return (
    <picture>
      {formats.map((format) => (
        <source
          src={resize({
            url: props.src,
            width,
            height,
            type: format,
          })}
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
