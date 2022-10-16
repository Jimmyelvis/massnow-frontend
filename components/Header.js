/**
 * Encapsulates header components such as the Nav Mobile Nav, Modal
 * Search Overlay
 */

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { signout, isAuth } from "../actions/auth";
import Modal from "../components/pageelements/Modal";
import SigninComponent from "../components/auth/SigninComponent";
import SignupComponent from "../components/auth/SignupComponent";
import { useGlobalContext } from "../context/context";
import Weather from "./vendors/Weather";
import Search from "./blog/Search";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../config";
import { HiSearch } from "react-icons/hi";
import SearchOverLay from "../components/pageelements/SearchOverlay";
import Nav from "./header-elements/Nav";
import MobileNav from "./header-elements/MobileNav";
import LoginBox from "./pageelements/LoginBox";

// Router.onRouteChangeStart = (url) => NProgress.start();
// Router.onRouteChangeComplete = (url) => NProgress.done();
// Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formShown, setFormShown] = useState("signIn");
  const { isModalOpen, openModal, openOverlay, isOverlayOpen } = useGlobalContext();

  /**
   * Piece of state that will be used to determine, what component
   * that wil be rendered in the modal
   */
  const [modalTarget, setModalTarget] = useState(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    Router.onRouteChangeStart = (url) => NProgress.start();
    Router.onRouteChangeComplete = (url) => NProgress.done();
    Router.onRouteChangeError = (url) => NProgress.done();
  }, [Router]);

    /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */
  const checkTarget = () => {
    
    if (modalTarget === "login_box") {
      
      return <LoginBox formShown={formShown} setFormShown={setFormShown} />;

    } else if (modalTarget === "search_overlay") {

        return <Search />;
    } 
  };

  return (
    <React.Fragment>
      <Nav
        setModalTarget={setModalTarget}
      />
      <MobileNav
        setModalTarget={setModalTarget}
      
      />

      <Modal
        selector={"#root_modal"}
        overlayColor={`${modalTarget === "login_box" ? 
        "rgba(0, 45, 112, 0.95)" : "rgba(255, 255, 255, 0.95)"}`}
        modalTarget={modalTarget}
      >
        {checkTarget()}
      </Modal>

    </React.Fragment>
  );
};

export default Header;
