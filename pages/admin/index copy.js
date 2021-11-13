import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Sectionhero from "../../components/hero/Sectionhero";
import Link from 'next/link';

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
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
                
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Admin Dashboard</h2>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create Category</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create Tag</a>
                                    </Link>
                                </li>

                                {/* <li className="list-group-item">
                                    <Link href="/admin/crud/blog">
                                        <a>Create Blog</a>
                                    </Link>
                                </li> */}

                                <li className="list-group-item">
                                        <a href="/admin/crud/blog">Create Blog</a>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/blogs">
                                        <a>Update/Delete Blog</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-8">right</div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;
