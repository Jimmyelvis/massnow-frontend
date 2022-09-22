import React from "react";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";
import Sectionhero from "../../../components/hero/Sectionhero";
import Link from "next/link";
import AdminLayout from "../../../components/AdminLayout";
import Pageheading from "../../../components/admin/Pageheading";


const CategoryTag = () => {
  return (
    <AdminLayout>
      <Admin>
        <Pageheading
          title="Manage Categories"
          subtitle="Create categories for the site."
        />

        <div className="cat-tags-contain">
          <Category />
          {/* <Tag /> */}
        </div>
      </Admin>
    </AdminLayout>
  );
};

export default CategoryTag;
