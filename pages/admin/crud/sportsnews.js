import AdminLayout from "../../../components/AdminLayout";
import Admin from "../../../components/auth/Admin";
import Secheading from "../../../components/pageelements/Secheading";
import NewsList from "../../../components/crud/top-news/Newslist";
import Head from "next/head";
import { useGlobalContext } from "../../../context/context";
import Pageheading from "../../../components/admin/Pageheading";


const Topsportsnewseditor = () => {
  const { isModalOpen, openModal, loading } = useGlobalContext();

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Welcome To MassNow News Site</title>
      </Head>

      <Admin>
        <Pageheading
          title="Sports News Selector"
          subtitle="Select which articles to include on the sports page featured stories."
        />

        <div className="crud-topnewseditor">
          <NewsList listFrom={"Top Sports"} />
        </div>
      </Admin>
    </AdminLayout>
  );
};

export default Topsportsnewseditor;
