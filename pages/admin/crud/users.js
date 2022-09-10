import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Sectionhero from "../../../components/hero/Sectionhero";
import Head from "next/head";
import AllUsers from "../../../components/crud/AllUsers";


const Users = () => {
  return (
    <Layout>
      <Head>
        <title>Welcome To MassNow News Site</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-quill/0.4.1/quill.snow.css"
        />
      </Head>

      <Admin>
        <Sectionhero
          /**
           *  contentColCount -- determines how many columns the content section
           *  will have. Additional options can be set such as  "narrow-wide" which
           *  means the first coloum will be smaller than the second, "wide-narrow"
           *  which will be the reverse, or even in both will have equal width. Default
           * is even
           */

          headline={"Edit  Users"}
          image={"/images/pexels-freestocksorg-58639.jpg"}
          heroclasses={"hero section-hero"}
          readmoreSection={false}
        ></Sectionhero>
        <div className="crud-content">
          <AllUsers/>
        </div>
      </Admin>
    </Layout>
  );
};

export default Users;
