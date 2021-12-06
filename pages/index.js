import Layout from "../components/Layout";
import Hero from "../components/hero/FrontPageHero.jsx";
import Latest from "../components/index/latest";
import Sports from "../components/index/sports";
import Local from "../components/index/local";
import Head from "next/head";
import Link from "next/link";
import { sortElems } from '../helpers/sorting'
import { API, DOMAIN, APP_NAME } from "../config";

const Index = ({ articles }) => {


    /**
     *  Filter for any article that has a value for the key
     *  featuredTopstory > 0. Assign the results to featured 
     *   stories variable. These are the articles that will be
     *   passed to the FrontPageHero component, and will
     *   be displayed in the front page hero
     */
    let featuredStores = articles.filter((article) => {
      return article.featuredTopstory > 0;
    });

    /**
     *  The logic will be similar to above, however the 
     *  results will be passed to the Sports section
     *  component
     */
    let featuredSports = articles.filter((article) => {
      return article.featuredSports > 0;
    });


    /**
      * Some similarity to above however in this case we are
      * getting the latest published articles. So we first
      * need to sort them DESC using the SortElems helper function
      * then slice the first 7. This will then be passed to 
      * the latest articles component
     */
    let sortedByUpdated = articles.sort((art1, art2) => {
      return sortElems(art2, art1, "updatedAt");
    });

    sortedByUpdated = sortedByUpdated.slice(0, 7)

    /**
     *  This section (News) is for the rest of the articles that 
     *  don't  match the above conditions. First filter for every
     *  article that is NOT a top story, or featured sports article.
     *  Then slice out the first 7 articles, the remaining articles
     *  after that will be passed the News component.
     */
    let therestof = articles.filter((article) => {
      return( !article.featuredTopstory > 0 && !article.featuredSports > 0)
    });

    therestof = therestof.slice(7)

   

  return (
    <Layout>
      <Head>
        <title>Welcome To MassNow News Site</title>
      </Head>

      <Hero blogs={featuredStores} />
      <Latest blogs={sortedByUpdated} />
      <Sports blogs={featuredSports} />
      <Local blogs={therestof} />
     
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
