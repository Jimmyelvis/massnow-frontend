import AdminLayout from '../../../components/AdminLayout';
import Admin from '../../../components/auth/Admin';
import Author from "../../../components/auth/Author";
import BlogRead from '../../../components/crud/BlogRead';
import {FilterProvider} from '../../../context/filter_context'
import { BlogsProvider } from '../../../context/blogs_context'; 
import Pageheading from '../../../components/admin/Pageheading';
import Link from 'next/link';

const Blog = () => {
    return (
      <AdminLayout>
        <Author>
          <Pageheading
            title="All Of Our Articles"
            subtitle="Edit or delete articles. Note that authors can only edit or delete articles that they have created "
          />

          <BlogsProvider>
            <FilterProvider>
              <BlogRead />
            </FilterProvider>
          </BlogsProvider>
        </Author>
      </AdminLayout>
    );
};

export default Blog;