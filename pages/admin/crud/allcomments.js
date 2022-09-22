import React from "react";
import AdminLayout from "../../../components/AdminLayout";
import Pageheading from "../../../components/admin/Pageheading";
import GetAllcomments from "../../../components/comments/getAllcomments";

const allcomments = () => {
  return (
    <AdminLayout>
      <Pageheading
        title="All Comments"
        subtitle="View all the comments submited to or site"
      />

      <GetAllcomments />
    </AdminLayout>
  );
};

export default allcomments;
