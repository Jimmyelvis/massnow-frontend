// pages/_app.js
import React from 'react'
import Head from 'next/head'
import { AppProvider } from '../context';


 
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
      {/* <Component {...pageProps} /> */}
    </>
  )
}
 
export default MyApp