import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Author from "../../../components/auth/Author";
import BlogRead from '../../../components/crud/BlogRead';
import Link from 'next/link';

const Blog = () => {
    return (
        <Layout>
            <Author>
                <div class="hero blogcreate">
                    <div class="overlay"></div>
                    <img src="/images/pexels-freestocksorg-58639.jpg" class="herobg" alt="" />

                    <h2 className="heading-2">All of Our Stories</h2>
                </div>

                    <BlogRead />
                 
                
            </Author>
        </Layout>
    );
};

export default Blog;