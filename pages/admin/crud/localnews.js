import AdminLayout from "../../../components/AdminLayout";
import Admin from "../../../components/auth/Admin";
import Secheading from "../../../components/pageelements/Secheading";
import NewsList from "../../../components/crud/top-news/Newslist"
import Head from "next/head";
import { useGlobalContext } from "../../../context/context";
import Pageheading from "../../../components/admin/Pageheading";


const Localnewseditor = () => {
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
        <title>Local News Selector</title>
      </Head>

      <Admin>
        <Pageheading
          title="Local News Selector"
          subtitle="Select which articles to include on the Local News featured stories."
        />

        <div className="crud-topnewseditor">
          <NewsList listFrom={"Top Local"} />
        </div>
      </Admin>
    </AdminLayout>
  );
};

export default Localnewseditor;
