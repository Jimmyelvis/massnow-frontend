import React, { useState, useEffect } from "react";
import Header from "./Header";
import ScrollToTop from "./pageelements/scroll/ScrollToTop";
import { useAdminContext } from "../context/AdminContextProvider";
import { FiSettings } from "react-icons/fi";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

const AdminLayout = ({ children }) => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    setActiveMenu,
    currentColor,
    themeSettings,
    screenSize,
    setScreenSize,
  } = useAdminContext();

  /** Determine if we want the admin panel to move to 
      move to the right when activeMenu is set to true
   */
  const [movePanelLeft, setMovePanelLeft] = useState(true);

  /**
   * We use this function dynamically  obtain the screensize
   * at set its value to the `screensize` state variable
   */
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * When the screensize <= 900 disable the adminpanel moving right
   * when activeMenu is set to true
   */
  useEffect(() => {
    if (screenSize <= 1200) {
      setMovePanelLeft(false);
    } else {
      setMovePanelLeft(true);
    }
  }, [screenSize]);

  /**
   * Determines at what screen size that the sidebar automatically
   * appears.
   */
  useEffect(() => {
    if (screenSize <= 1200) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <React.Fragment>
      <div className="admin_container">
        {/**
         * Will determine if the sidebar is visible
         */}
        {activeMenu ? (
          <div className="admin_sidebar">
            <Sidebar />
          </div>
        ) : (
          <div className="admin_sidebar width-0">
            <Sidebar />
          </div>
        )}

        {/**
            If the menu is open (activeMenu === true) move the admin menu left 18rem
           */}

        <div
          className={`admin-bg  ${
            activeMenu && movePanelLeft ? "move_left" : ""
          } `}
        >
          <div className="admin_navbar">
            <Navbar />
          </div>
          {children}
          <ScrollToTop />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminLayout;
