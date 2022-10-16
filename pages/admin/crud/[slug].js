import Layout from "../../../components/Layout";
import AdminLayout from "../../../components/AdminLayout";
import Author from "../../../components/auth/Author";
import BlogUpdate from "../../../components/crud/BlogUpdate";
import Head from "next/head";

const Blog = () => {
  return (
    <AdminLayout>
      <Head>
        <title>Welcome To MassNow News Site</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/react-quill/0.4.1/quill.snow.css" />
      </Head>
      <Author>
        <div className="crud-content">
          <BlogUpdate />
        </div>
      </Author>
    </AdminLayout>
  );
};

export default Blog;
