import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../actions/auth";

const Author = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push(`/signin`);
    } else if (isAuth().role < 1 ) {
      Router.push(`/`);
    }

    console.log("=============isAuth().role =======================");
    console.log(isAuth().role);
    console.log('====================================');
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};

export default Author;
