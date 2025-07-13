import AdminLogin from '../pages/Admin/AdminLogin';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import { Route, Routes } from 'react-router-dom';

const AdminRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
    </Routes>
  )
};
export default AdminRouter;
