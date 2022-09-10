import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Author from "../../components/auth/Author";
import Sectionhero from "../../components/hero/Sectionhero";
import { isAuth } from "../../actions/auth";
import Link from 'next/link';
import { AuthContext } from '../../context/auth_context';

const AdminIndex = () => {
    return (
      <Layout>
        <Author>
          <Sectionhero
            /**
             *  contentColCount -- determines how many columns the content section
             *  will have. Additional options can be set such as  "narrow-wide" which
             *  means the first coloum will be smaller than the second, "wide-narrow"
             *  which will be the reverse, or even in both will have equal width. Default
             * is even
             */

            headline={"Admin Section"}
            image={"/images/pexels-freestocksorg-58639.jpg"}
            heroclasses={"hero section-hero"}
            readmoreSection={false}
          ></Sectionhero>

          <div className="admin-Links">
            <div className="entry">
              <Link href="/admin/crud/category-tag">
                <a>
                  <div className="label">
                    <h3 className="heading-3">Create</h3>
                    <h3 className="heading-3">Category / Tag</h3>
                  </div>
                  <div className="overlay"></div>
                  <img src="/images/btn-category.jpg" alt="" />
                </a>
              </Link>
            </div>

            <div className="entry">
              <Link href="/admin/crud/blog">
                <a>
                  <div className="label">
                    <h3 className="heading-3">Create</h3>
                    <h3 className="heading-3">Blog</h3>
                  </div>
                  <div className="overlay"></div>
                  <img src="/images/btn-blog.jpg" alt="" />
                </a>
              </Link>
            </div>

            <div className="entry">
              <Link href="/admin/crud/blogs">
                <a>
                  <div className="label">
                    <h3 className="heading-3">Update Delete</h3>
                    <h3 className="heading-3">Blog</h3>
                  </div>
                  <div className="overlay"></div>
                  <img src="/images/btn-update-delete.jpg" alt="" />
                </a>
              </Link>
            </div>

            <div className="entry">
              <Link href={`/profile/${isAuth().username}`}>
                <a>
                  <div className="label">
                    <h3 className="heading-3">View Profile</h3>
                  </div>
                  <div className="overlay"></div>
                  <img src="/images/btn-update-delete.jpg" alt="" />
                </a>
              </Link>
            </div>

            <div className="entry">
              <Link href="/user/update">
                <a>
                  <div className="label">
                    <h3 className="heading-3">Update Profile</h3>
                  </div>
                  <div className="overlay"></div>
                  <img src="/images/btn-update-delete.jpg" alt="" />
                </a>
              </Link>
            </div>

            {isAuth() && isAuth().role === 2 && (
              <div className="entry">
                <Link href="/admin/crud/topnewseditor">
                  <a>
                    <div className="label">
                      <h3 className="heading-3">Edit Top News Section</h3>
                    </div>
                    <div className="overlay"></div>
                    <img src="/images/btn-update-delete.jpg" alt="" />
                  </a>
                </Link>
              </div>
            )}

            {isAuth() && isAuth().role === 2 && (
              <div className="entry">
                <Link href="/admin/crud/sportsnews">
                  <a>
                    <div className="label">
                      <h3 className="heading-3">Edit Sports News Section</h3>
                    </div>
                    <div className="overlay"></div>
                    <img src="/images/btn-update-delete.jpg" alt="" />
                  </a>
                </Link>
              </div>
            )}

            {isAuth() && isAuth().role === 2 && (
              <div className="entry">
                <Link href="/admin/crud/localnews">
                  <a>
                    <div className="label">
                      <h3 className="heading-3">Edit Local Section</h3>
                    </div>
                    <div className="overlay"></div>
                    <img src="/images/btn-update-delete.jpg" alt="" />
                  </a>
                </Link>
              </div>
            )}

            {isAuth() && isAuth().role === 2 && (
              <div className="entry">
                <Link href="/admin/crud/users">
                  <a>
                    <div className="label">
                      <h3 className="heading-3">Edit Users</h3>
                    </div>
                    <div className="overlay"></div>
                    <img src="/images/btn-update-delete.jpg" alt="" />
                  </a>
                </Link>
              </div>
            )}
          </div>
        </Author>
      </Layout>
    );
};

export default AdminIndex;
