import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import ProfileUpdate from "../../components/auth/ProfileUpdate";
import Sectionhero from "../../components/hero/Sectionhero";
import Link from "next/link";
import React from "react";

const UserProfileUpdate = () => {
  return (
    <Layout>
      <Private>
        <React.Fragment>
          <ProfileUpdate />
        </React.Fragment>
      </Private>
    </Layout>
  );
};

export default UserProfileUpdate;
