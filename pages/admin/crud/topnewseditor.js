import AdminLayout from "../../../components/AdminLayout";
import Admin from "../../../components/auth/Admin";
import NewsList from "../../../components/crud/top-news/Newslist";
import Head from "next/head";
import { useGlobalContext } from "../../../context/context";
import Pageheading from "../../../components/admin/Pageheading";

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
    <AdminLayout>
      <Head>
        <title>Top News Selector</title>
      </Head>

      <Admin>
        <Pageheading
          title="Top News Selector"
          subtitle="Select which articles to include on the homepage featured stories."
        />

        <div className="crud-topnewseditor">
          <NewsList listFrom={"Top News"} />
        </div>
      </Admin>
    </AdminLayout>
  );
};

export default Topnewseditor;
