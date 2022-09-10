import React from 'react'
import Userupdate from '../../../../components/crud/Userupdate'
import Layout from "../../../../components/Layout";
import Admin from "../../../../components/auth/Admin";
import Sectionhero from "../../../../components/hero/Sectionhero";
import Head from "next/head";



const user = () => {
  return (
    <Layout>
      <Head>
        <title>Update Users - Admins Only</title>
      </Head>

      <Admin>
        <Sectionhero
          headline={"Update Users - Admins Only"}
          image={"/images/pexels-freestocksorg-58639.jpg"}
          heroclasses={"hero section-hero"}
          readmoreSection={false}
        ></Sectionhero>
        <div className="crud-content">
          <Userupdate />
        </div>
      </Admin>
    </Layout>
  );
}

export default user