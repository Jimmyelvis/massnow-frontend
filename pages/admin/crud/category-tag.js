import React from "react";
import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";
import Sectionhero from "../../../components/hero/Sectionhero";
import Link from "next/link";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <Sectionhero
          /**
           *  contentColCount -- determines how many columns the content section
           *  will have. Additional options can be set such as  "narrow-wide" which
           *  means the first coloum will be smaller than the second, "wide-narrow"
           *  which will be the reverse, or even in both will have equal width. Default
           * is even
           */

          headline={"Manage Categories and Tags"}
          image={"/images/pexels-freestocksorg-58639.jpg"}
          heroclasses={"hero section-hero"}
          readmoreSection={false}
        ></Sectionhero>

        <div className="cat-tags-contain">
          <Category />
          <Tag />
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
