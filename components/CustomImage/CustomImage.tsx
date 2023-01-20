import Image from "next/image";
import { useState } from "react";
type Props = {
  src: string;
};

function CustomImage({ src }: Props) {
  const [paddingTop, setPaddingTop] = useState("0");
  const [paddingLeft, setPaddingLeft] = useState("0");
  const [width, setWidth] = useState("auto");
  const [height, setHeight] = useState("auto");
  return (
    <div
      style={{
        paddingTop,
        paddingLeft,
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
            setPaddingTop(`calc(100% / (${naturalWidth} / ${naturalHeight}))`);
            setWidth("100%");
          } else {
            setPaddingLeft(`calc(100% / (${naturalHeight} / ${naturalWidth}))`);
            setHeight("100%");
          }
        }}
      />
    </div>
  );
}

export default CustomImage;
