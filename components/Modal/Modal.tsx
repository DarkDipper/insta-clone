import { ReactNode, Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
type Props = {
  children: ReactNode;
  handleClose: Dispatch<SetStateAction<boolean>>;
};
function Modal({ children, handleClose }: Props) {
  return (
    <div className="modal-container">
      <button
        className="modal-container__close-btn"
        onClick={(e) => {
          e.preventDefault();
          handleClose(false);
        }}
      >
        <IoClose size={35} />
      </button>
      {children}
    </div>
  );
}

export default Modal;
