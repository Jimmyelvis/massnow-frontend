import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate";
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
      <Admin>
        <BlogUpdate />
      </Admin>
    </Layout>
  );
};

export default Blog;
