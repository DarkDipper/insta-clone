import useBlur from "@yourapp/hooks/useBlurHash";
import Image from "next/image";

type Props = {
  src?: string;
  width?: number;
  height?: number;
};
export default function Avatar({
  src = "https://i.imgur.com/uITbeDy.png",
  width,
  height,
}: Props) {
  const blurURL = useBlur(`${width}`, `${height}`);
  return (
    <div
      className="avatar"
      style={{
        width: width,
        height: height,
      }}
    >
      <Image
        placeholder="blur"
        blurDataURL={blurURL}
        src={src}
        alt="avatar"
        sizes="100%"
        fill
        draggable={false}
      />
    </div>
  );
}
