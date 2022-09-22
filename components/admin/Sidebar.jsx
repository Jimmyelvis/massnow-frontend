import React, { useState, useEffect } from "react";
import { useAdminContext } from "../../context/AdminContextProvider";
import CloseBtn from "../pageelements/CloseBtn";
import { BlueTxtLogo, WhiteTxtLogo } from "../pageelements/Logo";
import Link from "next/link";
import { set } from "nprogress";
import { isAuth } from "../../actions/auth";
import { FaEllipsisH } from "react-icons/fa";
import router, { withRouter } from "next/router";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useAdminContext();

  const [time, setTime] = useState(false);
  const [menuSet, setmenuSet] = useState(null);
  const [linkActive, setlinkActive] = useState(null);

  let activeLinks;

  /**
   *  Gives a slight delay to when the menu items
   * will appear after activeMenu is set to true
   */
  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (activeMenu) {
        setTime(true);
      } else {
        setTime(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeOut);
    };
  }, [activeMenu]);

  useEffect(() => {
    checkRoute();
    getActiveink();
  }, []);

  /**
   * When the extra menu icon (ellipsis) is clicked
   * change the menuSet state to the parameter that 
   * is passed in
   */
  const changeMenuSet = (linkSet) => {
    setmenuSet(linkSet);
  };

  /**
   * Compare the active pathname to the array links, 
   * if a match is found set the menuSet state to that
   * array of links
   */
  const checkRoute = () => {
    let linksCheck = firstLinks.filter((link) => {
      if (!link.href) {
        return;
      }
      return link.href === router.pathname;
    });

    if (linksCheck.length > 0) {
      setmenuSet("first");
    } else {
      setmenuSet("second");
    }
  };

  const getActiveink = () => {

    let linksCheck = firstLinks.filter((link) => {
      if (!link.href) {
        return;
      }
      return link.href === router.pathname;
    });

    if (!linksCheck.length > 0) {

     linksCheck = secondLinks.filter((link) => {
        if (!link.href) {
          return;
        }
        return link.href === router.pathname;
      });

      if (linksCheck.length > 0) {
        
        setlinkActive(linksCheck[0].href)
    
        console.log('====================================');
        console.log(linksCheck[0].href);
        console.log('====================================');
      }
    }

    

  };

  const firstLinks = [
    {
      href: "/admin",
      img: "/images/ui/dashboard icon.svg",
      text: "Dashboard",
      isAuthRole: 0,
    },
    {
      href: "/admin/crud/blog",
      img: "/images/ui/Icon ionic-ios-create.svg",
      text: "Create Blog",
      isAuthRole: 0,
    },
    {
      href: "/admin/crud/blogs",
      img: "/images/ui/Icon ionic-ios-create.svg",
      text: "Edit Blogs",
      isAuthRole: 0,
    },
    {
      href: "/admin/crud/category-tag",
      img: "/images/ui/Icon ionic-ios-create.svg",
      text: "Create / Edit Categories",
      isAuthRole: 0,
    },
    {
      href: "/admin/crud/topnewseditor",
      img: "/images/ui/Icon awesome-newspaper.svg",
      text: "Edit Top News Section",
      isAuthRole: 2,
    },
    {
      href: "/admin/crud/sportsnews",
      img: "/images/ui/Icon awesome-newspaper.svg",
      text: "Edit Sports News Section",
      isAuthRole: 2,
    },
    {
      href: "/admin/crud/localnews",
      img: "/images/ui/Icon awesome-newspaper.svg",
      text: "Edit Local News Section",
      isAuthRole: 2,
    },
    {
      changeSet: true,
      goToLinkSet: "second",
      text: "...",
      img: (
        <FaEllipsisH
          onClick={() => {
            changeMenuSet("second");
          }}
        />
      ),
    },
  ];

  const secondLinks = [
    {
      changeSet: true,
      goToLinkSet: "first",
      text: "...",
      img: (
        <FaEllipsisH
          onClick={() => {
            changeMenuSet("first");
          }}
        />
      ),
    },
    {
      href: "/admin/crud/users",
      img: "/images/ui/Icon awesome-users.svg",
      text: "Edit Users",
      isAuthRole: 2,
    },
    {
      href: "/admin/crud/allcomments",
      img: "/images/ui/Icon ionic-ios-create.svg",
      text: "View All Comments",
      isAuthRole: 0,
    },
    // {
    //   href: "/admin/crud/category-tag",
    //   img: "/images/ui/Icon ionic-ios-create.svg",
    //   text: "View All Replies",
    //   isAuthRole: 0,
    // },
  ];


  /**
   * Check what the value is in the menuSet state 
   * depending on what the value is set the activeLinks
   * var to either firstlinks or secondlinks
   * then map over them to render out the set of links
   * 
   */
  const renderActiveLinks = () => {
    if (menuSet === "first") {
      activeLinks = firstLinks;
    } else {
      activeLinks = secondLinks;
    }

    return activeLinks.map((link) => {
      if (link.isAuthRole === 2 && link.href) {
        return (
          isAuth() &&
          isAuth().role === 2 && (
            <li className={`link ${linkActive === link.href ? "active_link" : ""}`} key={link.text}>
              <Link href={link.href}>
                <a>
                  <img src={link.img} alt="" />
                  <h4>{link.text}</h4>
                </a>
              </Link>
            </li>
          )
        );
      } else if (link.href) {
        return (
          <li className={`link ${linkActive === link.href ? "active_link" : ""}`} key={link.text}>
            <Link href={link.href}>
              <a>
                <img src={link.img} alt="" />
                <h4>{link.text}</h4>
              </a>
            </Link>
          </li>
        );
      } else {
        return (
          <li className="link menu_change" key={link.text}>
            <div className="elipsiss">{link.img}</div>
            {/* <h4>{link.text}</h4> */}
          </li>
        );
      }
    });
  };

  return (
    <>
      {activeMenu && time && (
        <>
          <CloseBtn onClickFunction={() => setActiveMenu(false)} />

          <ul className="mt-24">
            <li className="link logo_contain">
              <Link href="/">
                <a>
                  <BlueTxtLogo />
                </a>
              </Link>
            </li>

            {renderActiveLinks()}
          </ul>
        </>
      )}
    </>
  );

  // return (
  //   <>
  //     {activeMenu && time && (
  //       <>
  //         <CloseBtn onClickFunction={() => setActiveMenu(false)} />

  //         <ul className="mt-24">
  //           <li className="link logo_contain">
  //             <Link href="/">
  //               <a>
  //                 <BlueTxtLogo />
  //               </a>
  //             </Link>
  //           </li>
  //           <li className="link">
  //             <Link href="/admin">
  //               <a>
  //                 <img src="/images/ui/dashboard icon.svg" alt="" />
  //                 <h4>Dashboard</h4>
  //               </a>
  //             </Link>
  //           </li>
  //           <li className="link">
  //             <Link href="/admin/crud/blog">
  //               <a>
  //                 <img src="/images/ui/Icon ionic-ios-create.svg" alt="" />
  //                 <h4>Create Blog</h4>
  //               </a>
  //             </Link>
  //           </li>
  //           <li className="link">
  //             <Link href="/admin/crud/blogs">
  //               <a>
  //                 <img src="/images/ui/Icon ionic-ios-create.svg" alt="" />
  //                 <h4>Edit Blogs</h4>
  //               </a>
  //             </Link>
  //           </li>
  //           <li className="link">
  //             <Link href="/admin/crud/category-tag">
  //               <a>
  //                 <img src="/images/ui/Icon ionic-ios-create.svg" alt="" />
  //                 <h4>Create / Edit Categories</h4>
  //               </a>
  //             </Link>
  //           </li>
  //           {isAuth() && isAuth().role === 2 && (
  //             <li className="link">
  //               <Link href="/admin/crud/topnewseditor">
  //                 <a>
  //                   <img src="/images/ui/Icon awesome-newspaper.svg" alt="" />
  //                   <h4>Edit Top News Section</h4>
  //                 </a>
  //               </Link>
  //             </li>
  //           )}

  //           {isAuth() && isAuth().role === 2 && (
  //             <li className="link">
  //               <Link href="/admin/crud/sportsnews">
  //                 <a>
  //                   <img src="/images/ui/Icon awesome-newspaper.svg" alt="" />
  //                   <h4>Edit Sports News Section</h4>
  //                 </a>
  //               </Link>
  //             </li>
  //           )}

  //           {isAuth() && isAuth().role === 2 && (
  //             <li className="link">
  //               <Link href="/admin/crud/localnews">
  //                 <a>
  //                   <img src="/images/ui/Icon awesome-newspaper.svg" alt="" />
  //                   <h4>Edit Local News Section</h4>
  //                 </a>
  //               </Link>
  //             </li>
  //           )}

  //           {isAuth() && isAuth().role === 2 && (
  //             <li className="link">
  //               <Link href="/admin/crud/users">
  //                 <a>
  //                   <img src="/images/ui/Icon awesome-users.svg" alt="" />
  //                   <h4>Edit Users</h4>
  //                 </a>
  //               </Link>
  //             </li>
  //           )}
  //         </ul>
  //       </>
  //     )}
  //   </>
  // );
};

export default withRouter(Sidebar);
