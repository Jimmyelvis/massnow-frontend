import AdminLayout from "../../../components/AdminLayout";
import Admin from "../../../components/auth/Admin";
import Author from "../../../components/auth/Author";
import BlogCreate from "../../../components/crud/BlogCreate";
import Secheading from "../../../components/pageelements/Secheading";
import Sectionhero from "../../../components/hero/Sectionhero";
import Link from "next/link";
import Head from "next/head";

const Blog = () => {
  return (
    <AdminLayout>
      <Head>
        <title>Welcome To MassNow News Site</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-quill/0.4.1/quill.snow.css"
        />
      </Head>

      <Author>
        {/* <Sectionhero
          headline={"Create A New Article"}
          image={"/images/pexels-freestocksorg-58639.jpg"}
          heroclasses={"hero section-hero"}
          readmoreSection={false}
        ></Sectionhero> */}

        <div className="crud-content">
          <BlogCreate />
        </div>
      </Author>
    </AdminLayout>
  );
};

export default Blog;
