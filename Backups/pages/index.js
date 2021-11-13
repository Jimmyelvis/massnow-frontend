import Layout from "../components/Layout";
import Hero from "../components/hero/Hero";
import Latest from "../components/index/latest";
import Sports from "../components/index/sports";
import Local from "../components/index/local";
import Otherstories from "../components/hero/Otherstories"
import Head from "next/head";
import "../scss/style.scss";
import Link from "next/link";
import { API, DOMAIN, APP_NAME } from "../config";

const Index = () => {
  return (
    <Layout>
      <Head>
        <title>Welcome To MassNow News Site</title>
      </Head>

      <Hero
        /**
         *  contentColCount -- determines how many columns the content section
         *  will have. Additional options can be set such as  "narrow-wide" which
         *  means the first coloum will be smaller than the second, "wide-narrow"
         *  which will be the reverse, or even in both will have equal width. Default
         * is even
         */

        headline={"Redsox beats Yankees In Winner Takes All Game"}
        subheadline={"New York Yankees 2-6 Boston Red Sox"}
        image={
          "https://res.cloudinary.com/dwgjvssdt/image/upload/v1633648390/j0hjv4ihrgpmrxsugm8c.webp"
        }
        heroclasses={"hero"}
        contentColCount={"col-2"}
        multicolType={"narrow-wide"}
        readmoreSection={true}
        readmoreLink={"blogs/redsox-beats-yankees"}
      >
        <Otherstories>
          <Link href={"blogs/resturant-fund"}>
            <a className="story">
              <img
                src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1633812322/mbuvkbis9ghpre556yfh.webp"
                alt=""
              />
              <p>
                Restaurant Revitalization Fund, grant money could be on the way
                for small businesses
              </p>
            </a>
          </Link>
          <Link href={"blogs/distance-learning-during-covid-19"}>
            <a className="story">
              <img
                src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1608081790/nd1rxrqhokul5dvficwp.jpg"
                alt=""
              />
              <p>Distance Learning During Covid-19</p>
            </a>
          </Link>
          <Link
            href={
              "blogs/after-facebook-hearing-blumenthal-goes-after-mark-zuckerberg-on-twitter:-'zuckerberg-should-look-at-himself-in-the-mirror'"
            }
          >
            <a className="story">
              <img
                src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1633814040/gm0ibv4dia4snvlvnxk4.jpg"
                alt=""
              />
              <p>Blumenthal goes after Mark Zuckerberg on Twitter</p>
            </a>
          </Link>
          <Link href={"blogs/2021-big-e-fair-draws-big-crowds"}>
            <a className="story">
              <img
                src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634353722/jkmwm9ma7xtyzx1h6bld.jpg"
                alt=""
              />
              <p>2021 Big E Fair Draws Big Crowds9</p>
            </a>
          </Link>
        </Otherstories>
      </Hero>

      <Latest />
      <Sports />
      <Local />
    </Layout>
  );
};

export default Index;
