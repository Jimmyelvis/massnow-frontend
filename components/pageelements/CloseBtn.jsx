import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";


const CloseBtn = ({ color, onClickFunction }) => {
  return (
    <button
      className="close-modal-btn "
      onClick={onClickFunction}
      style={{
        color: color
      }}
    >
      <IoIosCloseCircle />
    </button>
  );
}

export default CloseBtn