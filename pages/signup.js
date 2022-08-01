import React from "react";
import { useEffect } from "react";
import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent";
import Hero from "../components/hero/Sectionhero";
import Link from "next/link";
import { isAuth } from "../actions/auth";
import Router from "next/router";

const Signup = () => {

  useEffect(() => {
    if (isAuth()) {
      Router.push(`/`);
    }
  }, []);

  return (
    <Layout>
      <Hero
        image="/images/ui/signin.jpg"
        heroclasses="sign_hero"
        headline="Sign Up For A New Account"
      />

      <div className="signin_content">
        <div className="logo">
          <img src="/images/ui/logo-full-word-blue-txt.png" alt="" />
        </div>

        <div className="signin_form">
          <SignupComponent originFrom="signup page" />

          <Link href={`/signin`}>
            <a className="warning">
              Already have an account? Click here to log in.
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
