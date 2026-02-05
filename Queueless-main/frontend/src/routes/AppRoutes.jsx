import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardUser from '../pages/DashboardUser';
import DashboardAdmin from '../pages/DashboardAdmin';
import Feedback from '../pages/Feedback';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedback />} />
      </Route>

      {/* Protected Routes (for authenticated users) */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/dashboard/user" element={<DashboardUser />} />
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
