import Image from "next/image";
import { useState } from "react";
type Props = {
  src: string;
};

function CustomImage({ src }: Props) {
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("100%");
  return (
    <div
      style={{
        width,
        height,
        objectFit: "contain",
        position: "relative",
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        draggable="false"
        sizes="100%"
        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
          if (naturalHeight < naturalWidth) {
            setHeight(`calc(100% / (${naturalWidth} / ${naturalHeight}))`);
            setWidth("100%");
          } else {
            setWidth(`calc(100% / (${naturalHeight} / ${naturalWidth}))`);
            setHeight("100%");
          }
        }}
      />
    </div>
  );
}

export default CustomImage;
