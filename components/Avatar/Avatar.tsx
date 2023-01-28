import Image from "next/image";
import CustomImage from "../CustomImage";

type Props = {
  src?: string;
};
export default function Avatar({
  src = "https://i.imgur.com/uITbeDy.png",
}: Props) {
  return (
    <div className="avatar">
      <Image
        placeholder="blur"
        blurDataURL="https://i.imgur.com/uITbeDy.png"
        src={src}
        alt="avatar"
        sizes="100%"
        fill
        draggable={false}
      />
    </div>
  );
}
