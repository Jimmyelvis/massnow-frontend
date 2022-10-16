import Layout from '../../components/Layout';
import AdminLayout from '../../components/AdminLayout';
import Admin from '../../components/auth/Admin';
import Author from "../../components/auth/Author";
import Sectionhero from "../../components/hero/Sectionhero";
import { isAuth } from "../../actions/auth";
import Link from 'next/link';
import { AuthContext } from '../../context/auth_context';
import Recent_articles from '../../components/admin/Recent_articles';
import Most_Commented from '../../components/admin/Most_Commented';
import Categories from '../../components/admin/Categories';

const AdminIndex = () => {
    return (
      <AdminLayout>
        <Author>
          <div className="admin_Index">
            <Recent_articles />
            <Most_Commented/>
            <Categories/>
          </div>
        </Author>
      </AdminLayout>
    );
};

export default AdminIndex;
