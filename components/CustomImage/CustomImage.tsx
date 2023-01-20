import Image from "next/image";
import { useState } from "react";
type Props = {
  src: string;
};

function CustomImage({ src }: Props) {
  const [paddingTop, setPaddingTop] = useState("0");
  return (
    <div
      style={{
        paddingTop,
        width: "100%",
        objectFit: "contain",
        position: "relative",
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
          setPaddingTop(`calc(100% / (${naturalWidth} / ${naturalHeight})`);
        }}
      />
    </div>
  );
}

export default CustomImage;
