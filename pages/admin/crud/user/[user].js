import React from 'react'
import Userupdate from '../../../../components/crud/Userupdate'
import AdminLayout from "../../../../components/AdminLayout";
import Admin from "../../../../components/auth/Admin";
import Sectionhero from "../../../../components/hero/Sectionhero";
import Head from "next/head";
import Pageheading from '../../../../components/admin/Pageheading';



const user = () => {
  return (
    <AdminLayout>

      <Admin>
      <Pageheading title="Update Users" subtitle="Admins Use Only" />
    
        <div className="crud-content">
          <Userupdate />
        </div>
      </Admin>
    </AdminLayout>
  );
}

export default user