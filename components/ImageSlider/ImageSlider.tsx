import { MouseEvent, useState } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import CustomImage from "../CustomImage";
type props = {
  listImages: string[];
  size: number;
  handleModal?: (e: MouseEvent) => void;
};

function ImageSlider({ listImages, size, handleModal }: props) {
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
      {currentIndex !== 0 && listImages.length > 1 && (
        <button
          className="image-slider-container--left-btn"
          onClick={handlePrev}
        >
          <AiFillLeftCircle size={30} />
        </button>
      )}
      <div
        className="image-slider-container__main-content"
        onClick={handleModal}
        style={{
          transform: `translateX(${-size * currentIndex}px)`,
          cursor: handleModal && "pointer",
        }}
      >
        {listImages.map((src, index) => {
          return (
            <div
              className="image"
              key={index}
              style={{ width: `${size}px`, height: `${size}px` }}
            >
              <CustomImage src={src} />
            </div>
          );
        })}
      </div>
      {currentIndex !== listImages.length - 1 && listImages.length > 1 && (
        <button
          className="image-slider-container--right-btn"
          onClick={handelNext}
        >
          <AiFillRightCircle size={30} />
        </button>
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
