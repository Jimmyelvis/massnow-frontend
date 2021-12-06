import React from "react";
import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import ProfileUpdate from "../../components/auth/ProfileUpdate";
import Sectionhero from "../../components/hero/Sectionhero";
import Link from "next/link";

const UserProfileUpdate = () => {
  return (
    <Layout>
      <Private>
          <ProfileUpdate />
      </Private>
    </Layout>
  );
};

export default UserProfileUpdate;
