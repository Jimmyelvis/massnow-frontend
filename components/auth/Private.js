import React from "react";
import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../actions/auth";
import { useAuthContext } from "../../context/auth_context";


const Private = ({ children }) => {

  const { isSignedIn, updateAuthStatus } = useAuthContext();

  useEffect(() => {
    if (!isAuth() && isSignedIn === false) {
      Router.push(`/signin`);
    }
  }, [isSignedIn]);
  return <React.Fragment>{children}</React.Fragment>;
};

export default Private;
