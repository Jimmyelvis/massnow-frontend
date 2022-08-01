import React from "react";
import { useEffect } from "react";
import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import Hero from "../components/hero/Sectionhero";
import Link from "next/link";
import { isAuth } from "../actions/auth";
import Router from "next/router";


const Signin = () => {

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
        headline="Sign In To Your Account"
      />

      <div className="signin_content">
        <div className="logo">
          <img src="/images/ui/logo-full-word-blue-txt.png" alt="" />
        </div>

        <div className="signin_form">
          <SigninComponent originFrom="signin page" />

          <Link href={`/signup`}>
            <a className="warning">
               Don't have an account? Click here to create one.
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
