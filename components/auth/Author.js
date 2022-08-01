import React from "react";
import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../actions/auth";
import { useAuthContext } from "../../context/auth_context";

const Author = ({ children }) => {

  const { isSignedIn, updateAuthStatus } = useAuthContext();

    useEffect(() => {

      if (!isAuth() && isSignedIn === false) {

        Router.push(`/signin`);
      } else if (isAuth().role < 1) {
        Router.push(`/`);
      }
    }, [isSignedIn]);


  return <React.Fragment>{children}</React.Fragment>;
};

export default Author;
