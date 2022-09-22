import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { isAuth } from "../../actions/auth";
import NProgress from "nprogress";
import Router from "next/router";

import { Cart, Chat, Notification, UserProfile } from ".";
import { useAdminContext } from "../../context/AdminContextProvider";

const NavButton = ({
  title,
  customFunc,
  icon,
  color,
  dotColor,
  extraClasses,
}) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className={`icon_container ${extraClasses}`}
  >
    <span style={{ background: dotColor }} className="" />
    {icon}
  </button>
);

NavButton.defaultProps = {
  extraClasses: "",
};

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useAdminContext();

  useEffect(() => {
    Router.onRouteChangeStart = (url) => NProgress.start();
    Router.onRouteChangeComplete = (url) => NProgress.done();
    Router.onRouteChangeError = (url) => NProgress.done();
  }, [Router]);

  const getAvatar = () => {
    return !isAuth().photo ? (
      <img src="/images/ui/Profile.svg" alt="" />
    ) : (
      <img src={`${isAuth().photo}`} alt="" />
    );
  };

  return (
    <div className={`admin_nav_items ${activeMenu ? "move_right" : ""} `}>
      <NavButton
        title="menu"
        customFunc={() => setActiveMenu((prev) => !prev)}
        color={currentColor}
        icon={<GiHamburgerMenu />}
      />

      <div className="right_side">
        {/* <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
          extraClasses={"notification_icon"}
        /> */}

        <div
          className="user_profile"
          onClick={() => handleClick("userProfile")}
        >
          <div className="avatar">{getAvatar()}</div>
          <p>
            <span className="">{isAuth().name}</span>
          </p>
          <MdKeyboardArrowDown className="" />
        </div>

        {/**
         * Render the component based on if the state isClicked is true
         */}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
