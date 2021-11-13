import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Secheading from "../../../components/pageelements/Secheading";
import Topnewslist from "../../../components/crud/top-news/Topnewslist";
// import Choosefromlist from "../../../components/crud/top-news/Choosefromlist";
import Link from "next/link";
import Head from "next/head";
import { useGlobalContext } from "../../../context";
import Modal from "../../../components/pageelements/Modal";

const Topnewseditor = () => {
  const { isModalOpen, openModal, loading } = useGlobalContext();


  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Welcome To MassNow News Site</title>
      </Head>

      <Admin>
        {/* <Modal
          contentBgcolor={null}
          overlayColor={`rgba(242, 246, 252, 0.95)`}
          gridType={`Choosefromlist`}
          transition={`all 0.7s linear`}
        >
        </Modal> */}

        <div className="hero blogcreate">
          <div className="overlay"></div>
          <img
            src="/images/pexels-freestocksorg-58639.jpg"
            className="herobg"
            alt=""
          />

          <h2 className="heading-2">Edit the Top News Section</h2>
        </div>

        {/* <button onClick={openModal} className="btn btn-secondary btn-openModel">
          Add Story
        </button> */}
       
          <div className="crud-topnewseditor">

          <Topnewslist />
        </div>
      </Admin>
    </Layout>
  );
};

export default Topnewseditor;
