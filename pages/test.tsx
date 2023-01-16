import { useState, MouseEvent } from "react";
import useComponentVisible from "../hooks/useComponentVisible";
import Modal from "../components/Modal";
import ModalPost from "../components/ModalPost";
const SlideImage = [
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
  {
    src: "https://i.ibb.co/nkYrxTW/loginpage3.png",
  },
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
  {
    src: "https://i.ibb.co/c1YQvN6/defaultpost.jpg",
  },
];
export default function Test() {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const handleShow = (e: MouseEvent) => {
    e.preventDefault();
    setIsComponentVisible(true);
  };
  return (
    <main style={{ height: "100vh", width: "100vw", background: "black" }}>
      <button onClick={handleShow}>Click me</button>
      {isComponentVisible ? (
        <Modal>
          <ModalPost SlideImage={SlideImage} modalPostRef={ref} />
        </Modal>
      ) : (
        ""
      )}
    </main>
  );
}
