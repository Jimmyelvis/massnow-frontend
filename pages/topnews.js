import Layout from "../components/Layout";
import Hero from "../components/hero/Hero";
import Majorsection from "../components/pageelements/Majorsection";
import Otherstories from "../components/hero/Otherstories";
import Secheading from "../components/pageelements/Secheading";

import Head from "next/head";
import Link from "next/link";

const topnews = () => {
  return (
    <Layout>
      <Head>
        <title>Our Top Stories</title>
      </Head>

      <Hero
        headline={"New Headline"}
        subheadline={"Sub Headline"}
        image={"/images/Hero Bg-voters.jpg"}
        heroclasses={"hero hero-category"}
        contentColCount={"col-2"}
        multicolType={"narrow-wide"}
        readmoreSection={true}
        readmoreLink="topnews"
      >
        <Otherstories>
          <li className="story">
            <img
              src="/images/thumbs/domenico-loia-310197-unsplash@2x.jpg"
              alt=""
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos, sit.
            </p>
          </li>
          <li className="story">
            <img src="/images/thumbs/pexels-photo-2781760.jpg" alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos, sit.
            </p>
          </li>
        </Otherstories>
      </Hero>

      <div className="topnewssection">
        <Secheading heading={"Top Stories"} />

        <div className="content">
          <Majorsection
            picture1={"/images/xnNzNp_t20_WQRWRX.jpg"}
            headline1={"The state of politics today "}
            author1={"Frank Palmer"}
            picture2={"/images/ryanair-5249631_1920.jpg"}
            headline2={"The future of flight"}
            author2={"Micheal Corbin"}
            picture3={"/images/thumbs/pexels-kelly-lacy-4622593.jpg"}
            headline3={"Lorem ipsum dolor sit"}
            author3={"Rex Heart"}
          />

          <div className="minorsection">
            <div className="column">
              <div className="entry">
                <h4 className="heading-4">Lorem ipsum dolor sit </h4>

                <span className="author">By Frank Hillard</span>

                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Mollitia doloribus praesentium omnis ut quis eos consectetur
                  ipsa temporibus?
                </p>

                <div className="thumb">
                  <img src="/images/library-5641389_1920.jpg" alt="" />
                </div>
              </div>

              <div className="entry">
                <h4 className="heading-4">Lorem ipsum dolor sit </h4>

                <span className="author">By Frank Hillard</span>

                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Mollitia doloribus praesentium omnis ut quis eos consectetur
                  ipsa temporibus?
                </p>

                <div className="thumb">
                  <img src="/images/07_1067017652.jpg" alt="" />
                </div>
              </div>
            </div>

            <div className="column">
              <div className="entry">
                <h4 className="heading-4">Lorem ipsum dolor sit </h4>

                <span className="author">By Frank Hillard</span>

                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Mollitia doloribus praesentium omnis ut quis eos consectetur
                  ipsa temporibus?
                </p>

                <div className="thumb">
                  <img src="/images/dumbo-5212670.jpg" alt="" />
                </div>
              </div>

              <div className="entry">
                <h4 className="heading-4">Lorem ipsum dolor sit </h4>

                <span className="author">By Frank Hillard</span>

                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Mollitia doloribus praesentium omnis ut quis eos consectetur
                  ipsa temporibus?
                </p>

                <div className="thumb">
                  <img src="/images/fire-fighting-4495488_1920.jpg" alt="" />
                </div>
              </div>
            </div>

            <div className="column">
              <div className="entry">
                <h4 className="heading-4">Lorem ipsum dolor sit </h4>

                <span className="author">By Frank Hillard</span>

                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Mollitia doloribus praesentium omnis ut quis eos consectetur
                  ipsa temporibus?
                </p>

                <div className="thumb">
                  <img
                    src="/images/thumbs/KSYYTUQDH5AKRLN4KFG3LM67NI.jpg"
                    alt=""
                  />
                </div>
              </div>

              <div className="entry">
                <h4 className="heading-4">Lorem ipsum dolor sit </h4>

                <span className="author">By Frank Hillard</span>

                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Mollitia doloribus praesentium omnis ut quis eos consectetur
                  ipsa temporibus?
                </p>

                <div className="thumb">
                  <img
                    src="/images/thumbs/salmon-dish-food-meal-46239.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default topnews;
