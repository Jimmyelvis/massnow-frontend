import Header from "./Header";
import Footer from "./Footer"
import "../scss/style.scss";
import { useGlobalContext } from "../context";



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
        <Footer />
      </div>

    </React.Fragment>
  );
};

export default Layout;
