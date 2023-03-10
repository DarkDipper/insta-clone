import Image from "next/image";
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
type Props = {
  src: string;
  imgWidth?: number;
  imgHeight?: number;
  blurHash?: string;
};

function CustomImage({ src, imgWidth, imgHeight, blurHash }: Props) {
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("100%");
  const [Loaded, setLoaded] = useState(false);
  const handleLoadingComplete = ({
    naturalWidth,
    naturalHeight,
  }: {
    naturalWidth: number;
    naturalHeight: number;
  }) => {
    if (naturalHeight < naturalWidth) {
      setHeight(`calc(100% / (${naturalWidth} / ${naturalHeight}))`);
      setWidth("100%");
    } else {
      setWidth(`calc(100% / (${naturalHeight} / ${naturalWidth}))`);
      setHeight("100%");
    }
  };
  useEffect(() => {
    if (imgHeight && imgWidth) {
      if (imgHeight < imgWidth) {
        setHeight(`calc(100% / (${imgWidth} / ${imgHeight}))`);
        setWidth("100%");
      } else {
        setWidth(`calc(100% / (${imgHeight} / ${imgWidth}))`);
        setHeight("100%");
      }
    }
  }, [imgHeight, imgWidth]);
  return (
    <div
      style={{
        width,
        height,
        objectFit: "contain",
        position: "relative",
      }}
    >
      {blurHash && (
        <Blurhash
          style={{
            transition: "opacity ease-in-out 0.3s",
            opacity: !Loaded ? 1 : 0,
            zIndex: "1",
          }}
          hash={blurHash}
          width={"100%"}
          height={"100%"}
        />
      )}
      <Image
        src={src}
        alt=""
        fill
        draggable="false"
        sizes="(min-width: 1024) 100%, (min-width: 768) 100%, 100%"
        loading="lazy"
        placeholder={blurHash ? "blur" : "empty"}
        blurDataURL={blurHash ? blurHash : undefined}
        onLoadingComplete={
          blurHash
            ? () => {
                setLoaded(true);
              }
            : handleLoadingComplete
        }
      />
    </div>
  );
}

export default CustomImage;
