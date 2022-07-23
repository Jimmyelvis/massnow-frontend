import Layout from "../components/Layout";
import Hero from "../components/hero/FrontPageHero.jsx";
import Latest from "../components/index/latest";
import Sports from "../components/index/sports";
import Local from "../components/index/local";
import Head from "next/head";
import Link from "next/link";
import { API, DOMAIN, APP_NAME } from "../config";
import articles from "../TestData";


const Index = ( { articles }) => {

  /**
   * TODO: Finish refactoring Latest, Sports, Local sections
   */

  return (
    <Layout>
      <Head>
        <title>Welcome To MassNow News Site</title>
      </Head>
      <Hero incomingArticles={articles} />
      <Latest articles={articles} />;
      <Sports articles={articles} />
      <Local articles={articles} />
    </Layout>
  );
};

export default Index;

export const getStaticProps = async () => {
  const res = await fetch(`${API}/api/blogs`);

  const articles = await res.json();

  return {
    props: {
      articles,
    },
  };
};

// export const getStaticProps = async () => {


//   return {
//     props: {
//       articles: articles,
//     },
//   };
// };


