import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { isAuth } from "../../actions/auth";
import { getuserRoles } from "../../helpers/getuserroles";
import CloseBtn from "../pageelements/CloseBtn";
import Link from "next/link";

// import Button from "./Button";
import { userProfileData } from "./data/dummy";
import { useAdminContext } from "../../context/AdminContextProvider";
import avatar from "./data/avatar.jpg";

const UserProfile = () => {
  const { currentColor, handleClick } = useAdminContext();

  const getAvatar = () => {
    return !isAuth().photo ? (
      <img src="/images/ui/Profile.svg" alt="" />
    ) : (
      <img src={`${isAuth().photo}`} alt="" />
    );
  };

  return (
    <div className="drop_down_panel user_profile_dropdown ">
      <div className="drop_dowm_items">
        <CloseBtn onClickFunction={() => handleClick("userProfile")} />
      </div>
      <div className="user_info">
        <div className="avatar">{getAvatar()}</div>
        <div>
          <p className="name"> {isAuth().name} </p>
          <p className="role"> {getuserRoles(isAuth().role)} </p>
          <p className="email"> {isAuth().email} </p>
        </div>
      </div>
      <div>
        <div className="user_profile_items">
          <Link href={`profile/${isAuth().username}`}>
            <a>
              <img src="/images/ui/Icon awesome-users.svg" alt="" />
            </a>
          </Link>

          <div>
            <p className="title">My Profile</p>
            <p className="description"> View Your Profile</p>
          </div>
        </div>

        <div className="user_profile_items">
          <Link href="/user/update">
            <a>
              <img src="/images/ui/Icon awesome-users.svg" alt="" />
            </a>
          </Link>

          <div>
            <p className="title">Edit Profile</p>
            <p className="description"> Edit Your Profile</p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {/**
         *  todo: Figure out how to intrgrate t-wind classes for btn and my btn classes
         */}

        <button className="btn btn-primary-grad w-full mt-9">Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
