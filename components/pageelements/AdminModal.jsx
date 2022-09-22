import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { useGlobalContext } from "../../context/context";

const AdminModal = ({ children }) => {

  const { isModalOpen, closeModal } = useGlobalContext();


  return (
    <div className={` ${ isModalOpen ? "admin_modal show_admin_modal" : "admin_modal"} `}>
      {children}
    </div>
  )
}

export default AdminModal