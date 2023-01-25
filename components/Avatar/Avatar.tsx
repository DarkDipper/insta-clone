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
  return (
    <div
      className="avatar"
      style={{
        width: width,
        height: height,
      }}
    >
      <Image src={src} alt="avatar" sizes="100%" fill draggable={false} />
    </div>
  );
}
