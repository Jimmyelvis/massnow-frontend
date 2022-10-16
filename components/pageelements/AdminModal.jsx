import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useGlobalContext } from "../../context/context";
import { createPortal } from "react-dom";

const AdminModal = ({ children, selector }) => {
  const { isModalOpen, closeModal } = useGlobalContext();



  /** A piece of state to determine when we add the .hide css class
   * to the modal. So when we close it, it will fade out gradually
   * instead of instantly
   */
  const [hide, setHide] = useState(false); 

  AdminModal.defaultProps = {
    transition: "",
  };

  const styles = {
    width: "50rem",
    height: "50rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };


  /**
   * Closes the modal by first, setHide to true, which will
   * apply the .hide class for a gradual fade out. Then set the
   * global context state of closeModal which will unmount any 
   * children inside of the root_modal portal. Then setHide back
   * to false  
   */
  const closeDown = () => {
    setHide(true);

    setTimeout(() => {
      closeModal();
      setHide(false);
    }, 1000);
  };

  const getClassnames = () => {
    if (isModalOpen === true) {
      if (isModalOpen && hide === true) {
        return `modal-overlay  show-modal hide-modal`;
      }

      return `modal-overlay  show-modal`;
    } else {
      return `modal-overlay`;
    }
  };

  const modalContent = (
    <>
      <div className={`${getClassnames()}`}>
          {children}
     
        <button className="close-modal-btn " onClick={closeDown}>
          <IoIosCloseCircle />
        </button>
      </div>
    </>
  );


  return isModalOpen ? createPortal(modalContent, document.querySelector(selector)) : null;
};

export default AdminModal;
