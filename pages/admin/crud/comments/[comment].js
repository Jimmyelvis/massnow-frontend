import React from "react";
import AdminLayout from "../../../../components/AdminLayout";
import Pageheading from "../../../../components/admin/Pageheading";
import SingleComment from "../../../../components/comments/SingleComment";

const comment = () => {
  return (
    <AdminLayout>
      <Pageheading
        title="Comment Details"
        subtitle="Details about this comment"
      />

      <div className="crud-content">
        <SingleComment />
      </div>
    </AdminLayout>
  );
};

export default comment;
