import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { signout, isAuth } from "../actions/auth";
import Modal from "../components/pageelements/Modal";
import SigninComponent from "../components/auth/SigninComponent";
import SignupComponent from "../components/auth/SignupComponent";
import { useGlobalContext } from "../context";
import Weather from "./vendors/Weather";
import Search from "./blog/Search";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../config";
import { HiSearch } from "react-icons/hi";
import SearchOverLay from "../components/pageelements/SearchOverlay";
import Nav from "./header-elements/Nav"
import MobileNav from "./header-elements/MobileNav";





Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {


  const [isOpen, setIsOpen] = useState(false);
  const [formShown, setFormShown] = useState('signIn');
  const { isModalOpen, openModal, openOverlay, isOverlayOpen } = useGlobalContext();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <Nav />
      <MobileNav />
     
      <Modal
        contentBgcolor={null}
        overlayColor={`rgba(0, 45, 112, 0.95)`}
        transition={`all 0.7s linear`}
      >
        <div className="loginbox">
          <div className="contentbox">
            <div className="logo">
              <img src="/images/ui/Logo.png" alt="" />
            </div>

            <div
              className="signinForm"
              style={
                formShown === "signIn"
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <SigninComponent />

              <span className="warning" onClick={() => setFormShown("signUp")}>
                Don't have an account? Click here to create one.
              </span>
            </div>

            <div
              className="signupForm"
              style={
                formShown === "signUp"
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <SignupComponent />

              <span className="warning" onClick={() => setFormShown("signIn")}>
                Already have an account? Click here to log in.
              </span>
            </div>
          </div>
        </div>
      </Modal>

      <SearchOverLay
        contentBgcolor={null}
        overlayColor={`rgba(255, 255, 255, 0.95)`}
        transition={`all 0.7s linear`}
      >
        <Search />
      </SearchOverLay>

    </React.Fragment>
  );
};

export default Header;
