import Image from "next/image";

type Props = {
  src?: string;
  width?: number;
  height?: number;
};
export default function Avatar({
  src = "https://i.ibb.co/gWjhxPq/defaultavatar.png",
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
      <Image src={src} alt="avatar" fill draggable={false} />
    </div>
  );
}
