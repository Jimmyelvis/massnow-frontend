import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Secheading from "../../../components/pageelements/Secheading";
import Topnewslist from "../../../components/crud/Topnewslist";
import TopnewslistTest from "../../../components/crud/TopnewslistTest";
import Link from "next/link";
import Head from "next/head";
import { useGlobalContext } from "../../../context";
import Modal from "../../../components/pageelements/Modal";

const Topnewseditor = () => {
  const { isModalOpen, openModal  } = useGlobalContext();

  return (
    <Layout>

      <Head>
        <title>Welcome To MassNow News Site</title>
      </Head>

      <Admin>

      <Modal
        contentBgcolor={null}
        overlayColor={`rgba(242, 246, 252, 0.95)`}
        gridType={`topNewsEntries`}
        transition={`all 0.3s linear`}
      >

        <TopnewslistTest />

      </Modal>

        <div className="hero blogcreate">
          <div className="overlay"></div>
          <img
            src="/images/pexels-freestocksorg-58639.jpg"
            className="herobg"
            alt=""
          />

          <h2 className="heading-2">Edit the Top News Section</h2>
        </div>

        <div className={`${isModalOpen ? "crud-topnewseditor overflowFix" : "crud-topnewseditor" }`}>

        {/* <div className="crud-topnewseditor"> */}

          <button onClick={openModal} className="btn-teal">
            hey man
          </button>

          <Topnewslist />

        </div>

      </Admin>

    </Layout>
  );
};

export default Topnewseditor;
