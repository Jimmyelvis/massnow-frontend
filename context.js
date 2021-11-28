import React, { useState, useContext, useReducer, useEffect } from 'react'

const AppContext = React.createContext();


const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);




  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  const mobileMenu_Active = () => {
    setMobileMenuActive(true)
  }

  const mobileMenu_InActive = () => {
    setMobileMenuActive(false);
  };



  return (
     <AppContext.Provider
      value={{
        isSidebarOpen,
        isModalOpen,
        isOverlayOpen,
        mobileMenuActive,
        openModal,
        closeModal,
        openSidebar,
        closeSidebar,
        openOverlay,
        closeOverlay,
        mobileMenu_Active,
        mobileMenu_InActive
      }}
    >
      {children}
    </AppContext.Provider>
  );

};

// custom hook 
export const useGlobalContext = () => {
  return useContext(AppContext);
};


export { AppContext, AppProvider };