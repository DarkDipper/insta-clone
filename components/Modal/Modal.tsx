import { RefObject } from "react";
import ImageSlider from "../ImageSlider";
import { IoClose } from "react-icons/io5";
import Avatar from "../Avatar";
const SlideImage = [
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
];
type Props = {
  modalRef: RefObject<HTMLDivElement>;
};
function Modal({ modalRef }: Props) {
  return (
    <div className="modal-container">
      <button className="modal-container__close-btn">
        <IoClose size={35} />
      </button>
      <div className="modal-container__wrapper" ref={modalRef}>
        <div className="modal-container__wrapper__left">
          <ImageSlider listImages={SlideImage} size={636} />
        </div>
        <div className="modal-container__wrapper__right">
          <header className="header">
            <Avatar width={32} height={32} />
            <p className="header__user-name">vietnamoi</p>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Modal;
