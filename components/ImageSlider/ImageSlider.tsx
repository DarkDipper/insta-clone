import {
  MouseEvent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import CustomImage from "../CustomImage";
type props = {
  listImages: {
    path: string;
    width?: number;
    height?: number;
    blurHash?: string;
  }[];
  size: number;
  handleModal?: (e: MouseEvent) => void;
  setShareIndex?: Dispatch<SetStateAction<number>>;
};

function ImageSlider({ listImages, size, handleModal, setShareIndex }: props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handelNext = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => prev + 1);
    if (setShareIndex) {
      setShareIndex((prev) => prev + 1);
    }
  };
  const handlePrev = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => prev - 1);
    if (setShareIndex) {
      setShareIndex((prev) => prev - 1);
    }
  };
  const handlePointer = (e: MouseEvent, index: number) => {
    e.preventDefault();
    setCurrentIndex(index);
    if (setShareIndex) {
      setShareIndex(index);
    }
  };
  useEffect(() => {
    if (setShareIndex) {
      if (currentIndex > listImages.length - 1) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  }, [listImages]);
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
        {listImages.map((img, index) => {
          return (
            <div
              className="image"
              key={index}
              style={{ width: `${size}px`, height: `${size}px` }}
            >
              <CustomImage
                src={img.path}
                imgHeight={img.height}
                imgWidth={img.width}
                blurHash={img.blurHash}
              />
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
