import { useState, MouseEvent } from "react";
import useComponentVisible from "../hooks/useComponentVisible";
import Modal from "../components/Modal";
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
      {isComponentVisible ? <Modal modalRef={ref} /> : ""}
    </main>
  );
}
