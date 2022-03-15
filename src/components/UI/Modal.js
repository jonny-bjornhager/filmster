import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = ({ children, modalToggler, ref }) => {
  return ReactDOM.createPortal(
    <>
      <div onClick={modalToggler} className={classes["modal-backdrop"]}></div>
      <div ref={ref} className={classes["modal"]}>
        {children}
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
