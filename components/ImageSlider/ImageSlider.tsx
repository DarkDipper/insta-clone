import { MouseEvent, useState } from "react";
import Image from "next/image";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
type props = {
  listImages: { src: string }[];
  size: number;
};

function ImageSlider({ listImages, size }: props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handelNext = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => prev + 1);
  };
  const handlePrev = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => prev - 1);
  };
  const handlePointer = (e: MouseEvent, index: number) => {
    setCurrentIndex(index);
    console.log(index);
  };
  return (
    <div className="image-slider-container">
      {currentIndex !== 0 ? (
        <button
          className="image-slider-container--left-btn"
          onClick={handlePrev}
        >
          <AiFillLeftCircle size={30} />
        </button>
      ) : (
        ""
      )}
      <div
        className="image-slider-container__main-content"
        style={{ transform: `translateX(${-size * currentIndex}px)` }}
      >
        {/* <Image src={listImages[0]["src"]} alt="" fill sizes="100%" /> */}
        {listImages.map((item, index) => {
          return (
            <div className="image" key={index}>
              <Image src={item.src} alt="" width={size} height={size} />
            </div>
          );
        })}
      </div>
      {currentIndex !== listImages.length - 1 ? (
        <button
          className="image-slider-container--right-btn"
          onClick={handelNext}
        >
          <AiFillRightCircle size={30} />
        </button>
      ) : (
        ""
      )}
      <div className="list-pointer">
        {listImages.map((_, index) => (
          <div
            key={index}
            onClick={(e) => {
              handlePointer(e, index);
            }}
            className={`list-pointer__pointer ${
              index === currentIndex ? "active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
