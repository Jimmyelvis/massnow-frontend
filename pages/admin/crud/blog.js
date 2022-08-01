import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Author from "../../../components/auth/Author";
import BlogCreate from "../../../components/crud/BlogCreate";
import Secheading from "../../../components/pageelements/Secheading";
import Sectionhero from "../../../components/hero/Sectionhero";
import Link from "next/link";
import Head from "next/head";

const Blog = () => {
  return (
    <Layout>
      <Head>
        <title>Welcome To MassNow News Site</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-quill/0.4.1/quill.snow.css"
        />
      </Head>

      <Author>
        <Sectionhero
          /**
           *  contentColCount -- determines how many columns the content section
           *  will have. Additional options can be set such as  "narrow-wide" which
           *  means the first coloum will be smaller than the second, "wide-narrow"
           *  which will be the reverse, or even in both will have equal width. Default
           * is even
           */

          headline={"Create A New Article"}
          image={"/images/pexels-freestocksorg-58639.jpg"}
          heroclasses={"hero section-hero"}
          readmoreSection={false}
        ></Sectionhero>
        <div className="crud-content">
          <BlogCreate />
        </div>
      </Author>
    </Layout>
  );
};

export default Blog;
