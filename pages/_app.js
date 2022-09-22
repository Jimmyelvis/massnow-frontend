// pages/_app.js
import React from "react";
import Head from "next/head";
import { AppProvider } from "../context/context";
import { AuthProvider } from "../context/auth_context";
import { AdminContextProvider } from "../context/AdminContextProvider";
import "../scss/style.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" />
        <meta name="theme-color" content="#0058d3" />
      </Head>
      <AuthProvider>
        <AdminContextProvider>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </AdminContextProvider>
      </AuthProvider>
      {/* <Component {...pageProps} /> */}
    </>
  );
}

export default MyApp;
