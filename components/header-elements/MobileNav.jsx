import React, { useState } from "react";
import Link from "next/link";
import { signout, isAuth } from "../../actions/auth";
import Router from "next/router";
import { useGlobalContext } from "../../context/context";
import Weather from "../vendors/Weather";
import { HiSearch } from "react-icons/hi";
import { GiHamburgerMenu as MobileIcom } from "react-icons/gi";
import { RiCloseCircleFill } from "react-icons/ri";


const MobileNav = ({ setModalTarget }) => {

  // const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const {
      isModalOpen,
      openModal,
      openOverlay,
      isOverlayOpen,
      mobileMenuActive,
      mobileMenu_Active,
      mobileMenu_InActive
    } = useGlobalContext();


  const showAvatarMobile = () => {

    return (
      <div className="avatarMobile">
        {/**
         * If user is not logged in
         */}
        {!isAuth() && (
          <div
            className="profile-logo"
            onClick={() => {
              openModal(), setModalTarget("login_box");
            }}
          >
            <img src="/images/ui/Profile.svg" alt="" />
          </div>
        )}

        {/**
         * If user is logged in and is a only a subscriber
         */}
        {isAuth() && isAuth().role === 0 && (
          <ul className="authDashSignout">
            <li
              onClick={() => {
                mobileMenu_InActive();
              }}
            >
              <Link href="/user">
                <a className="avatar">
                  {/* <img src="/images/ui/Profile.svg" alt="" /> */}
                  <img src={`${isAuth().photo}`} alt="" />
                </a>
              </Link>
            </li>
            <li className="sign-out" onClick={() => signout(() => Router.replace(`/`))}>
              Signout
            </li>
          </ul>
        )}

        {/**
         * If user is logged in and their role is at least an author
         */}
        {isAuth() && isAuth().role >= 1 && (
          <ul className="authDashSignout">
            <li
              onClick={() => {
                mobileMenu_InActive();
              }}
            >
              <Link href="/admin">
                <a className="avatar">
                  <img src={`${isAuth().photo}`} alt="" />
                </a>
              </Link>
            </li>
            <li className="sign-out" onClick={() => signout(() => Router.replace(`/`))}>
              Signout
            </li>
          </ul>
        )}
      </div>
    );

  }
  
  return (
    <React.Fragment>
      <div className="mobile-nav">
        <ul className="navigation">
          <li className="mobile-logo">
            <img src="/images/logo-signal-circle-wht-text.png" alt="" />
          </li>
          <li>
            <MobileIcom
              className="mobile-icon"
              onClick={() => {
                mobileMenu_Active();
              }}
            />
          </li>
        </ul>
      </div>
      <div className={`${mobileMenuActive ? "mobile-menu mobile-menu active" : "mobile-menu"}`}>
        <RiCloseCircleFill
          className="close"
          onClick={() => {
            mobileMenu_InActive();
          }}
        />

        <ul className="links">
          <li className="profileAvatarMobile">{showAvatarMobile()}</li>
          <li className="weather">
            <Weather />
          </li>
          <li>
            <HiSearch
              className="search-icon"
              onClick={() => {
                openModal(), setModalTarget("search_overlay");
              }}
            />
          </li>
          <li>
            <Link href="/" passHref>
              <a onClick={mobileMenu_InActive}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/latest">
              <a onClick={mobileMenu_InActive}>Latest News</a>
            </Link>
          </li>
          <li>
            <Link href="/sports" passHref>
              <a onClick={mobileMenu_InActive}>Sports</a>
            </Link>
          </li>
          <li>
            <Link href="/local" passHref>
              <a onClick={mobileMenu_InActive}>Local News</a>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default MobileNav;
