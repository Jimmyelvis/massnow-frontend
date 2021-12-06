import React from "react";
import Header from "./Header";
import Footer from "./Footer"
import { useGlobalContext } from "../context";
import ScrollToTop from "./pageelements/scroll/ScrollToTop"



const Layout = ({ children }) => {
  const { isModalOpen } = useGlobalContext();

  return (
    <React.Fragment>
      <div
          className={`${
            isModalOpen
              ? "container overflowFix"
              : "container"
          }`}
        >
        <Header />
        {children}
        <ScrollToTop />
        <Footer />
      </div>

    </React.Fragment>
  );
};

export default Layout;
