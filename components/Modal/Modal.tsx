import { RefObject, ReactNode } from "react";
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
  children: ReactNode;
};
function Modal({ children }: Props) {
  return (
    <div className="modal-container">
      <button className="modal-container__close-btn">
        <IoClose size={35} />
      </button>
      {children}
    </div>
  );
}

export default Modal;
