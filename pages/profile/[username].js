import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import Sectionhero from "../../components/hero/Sectionhero";
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { isAuth } from "../../actions/auth";
import moment from "moment";
import { FaEdit } from "react-icons/fa";

const UserProfile = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.name} | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs by ${user.name}`} />
      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:title" content={`${user.name}| ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by ${user.username}`} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
    </Head>
  );

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div className="card-OverlayType" key={i}>
          <div className="card-info">
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <div className="heading-3">{blog.title}</div>

                <div className="heading-4">{blog.subtitle}</div>
              </a>
            </Link>
          </div>

          <div className="overlay"></div>
          <img src={blog.mainphoto} alt="" className="card-bg" />
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      {head()}

      <Layout>
        <Sectionhero
          /**
           *  contentColCount -- determines how many columns the content section
           *  will have. Additional options can be set such as  "narrow-wide" which
           *  means the first coloum will be smaller than the second, "wide-narrow"
           *  which will be the reverse, or even in both will have equal width. Default
           * is even
           */

          image={"/images/pexels-freestocksorg-58639.jpg"}
          heroclasses={"hero profile-hero"}
          readmoreSection={false}
        >
          <div className="profileAvatar">
            <div className="avatar">
              <img src={user.photo} alt="" />
            </div>

            <h3 className="heading-3">{user.name}</h3>
            <h3 className="heading-3">
              {isAuth().username ? console.log(isAuth().username) : ""}
              {/* { console.log(isAuth().role)} */}
              {/* {isAuth().username} */}
            </h3>

            {
              isAuth().username === user.username ? (
                <Link href="/user/update">
                    <a>
                      <div className="edit-profile">
                        <h4 className="heading-4">Edit Profile</h4>

                        <div className="icon-holder">
                          <FaEdit className="edit-icon" />
                        </div>
                      </div>
                    </a>
                  </Link>
              ) : ""
            }

           

            {/* <ul className="social-media">
                <li>
                  <img src="/images/ui/facebook.svg" />
                </li>
                <li>
                  <img src="/images/ui/twitter.svg" />
                </li>
              </ul> */}
          </div>
        </Sectionhero>

        <div className="profilePg">
          <div className="bio">{user.about}</div>

          {user.role >= 1 && blogs.length > 0 ? (
            <div className="blogsection">
              <h3 className="heading-3">Recent blogs by {user.name}</h3>

              <div className="blogs">{showUserBlogs()}</div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* <div className="card">
              <div className="card-body">
                <h5>{user.name}</h5>
                <Link href={`${user.profile}`}>
                  <a>View Profile</a>
                </Link>
                <p className="text-muted">
                  Joined {moment(user.createdAt).fromNow()}
                </p>
              </div>
            </div> */}

        {/* <div className="card">
                <div className="card-body">
                <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">
                    Message {user.name}
                </h5>
                <br />
                <p>contact form</p>
                </div>
            </div> */}
      </Layout>
    </React.Fragment>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  // console.log(query);
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { user: data.user, blogs: data.blogs, query };
    }
  });
};

export default UserProfile;
