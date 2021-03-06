import { useState } from "react";
import Link from "next/link";
import { signout, isAuth } from "../../actions/auth";
import Router from "next/router";
import { useGlobalContext } from "../../context";
import Weather from "../vendors/Weather";
import { HiSearch } from "react-icons/hi";




const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formShown, setFormShown] = useState("signIn");
  const { isModalOpen, openModal, openOverlay, isOverlayOpen } =
    useGlobalContext();

  return (
    <nav>
      <div className="top">
        <Weather />

        <span className="logo">
          <Link href="/" passHref>
            <img src="/images/logo-wht-text-orange-singnal.png" alt="" />
          </Link>
        </span>

        {!isAuth() && (
          <ul className="authDashSignout">
            <li>
              <HiSearch className="search-icon" onClick={openOverlay} />
            </li>
            <div className="profile-logo" onClick={openModal}>
              <img src="/images/ui/Profile.svg" alt="" />
            </div>
          </ul>
        )}

        {isAuth() && isAuth().role === 0 && (
          <ul className="authDashSignout">
            <li>
              <HiSearch className="search-icon" onClick={openOverlay} />
            </li>
            <li>
              <Link href="/user">
                <a className="avatar">
                  {/* <img src="/images/ui/Profile.svg" alt="" /> */}
                  <img src={`${isAuth().photo}`} alt="" />
                </a>
              </Link>
            </li>
            <li
              className="sign-out"
              onClick={() => signout(() => Router.replace(`/`))}
            >
              Signout
            </li>
          </ul>
        )}

        {isAuth() && isAuth().role >= 1 && (
          <ul className="authDashSignout">
            <li>
              <HiSearch className="search-icon" onClick={openOverlay} />
            </li>
            <li>
              <Link href="/admin">
                <a className="avatar">
                  <img src={`${isAuth().photo}`} alt="" />
                </a>
              </Link>
            </li>
            <li
              className="sign-out"
              onClick={() => signout(() => Router.replace(`/`))}
            >
              Signout
            </li>
          </ul>
        )}
      </div>

      <div className="bottom">
        <ul>
          <li>
            <Link href="/" passHref>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/latest" passHref>
              <a>Latest News</a>
            </Link>
          </li>
          <li>
            <Link href="/sports" passHref>
              <a>Sports</a>
            </Link>
          </li>
          <li>
            <Link href="/local" passHref>
              <a>Local News</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
