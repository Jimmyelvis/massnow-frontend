import Layout from "../../../components/Layout";
import Author from "../../../components/auth/Author";
import BlogUpdate from "../../../components/crud/BlogUpdate";
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
        <BlogUpdate />
      </Author>
    </Layout>
  );
};

export default Blog;
