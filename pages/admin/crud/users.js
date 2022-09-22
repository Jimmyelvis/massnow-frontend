import AdminLayout from "../../../components/AdminLayout";
import Admin from "../../../components/auth/Admin";
import Sectionhero from "../../../components/hero/Sectionhero";
import Head from "next/head";
import AllUsers from "../../../components/crud/AllUsers";
import Pageheading from "../../../components/admin/Pageheading";

const Users = () => {
  return (
    <AdminLayout>
      <Head>
        <title>Welcome To MassNow News Site</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-quill/0.4.1/quill.snow.css"
        />
      </Head>

      <Admin>
        <Pageheading
          title="Edit Users"
          subtitle="Edit user roles."
        />

        <div className="crud-content">
          <AllUsers />
        </div>
      </Admin>
    </AdminLayout>
  );
};

export default Users;
