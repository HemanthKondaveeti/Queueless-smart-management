import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole, logout } from '../utils/auth';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    setAuth(isAuthenticated());
    setRole(getUserRole());
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-800">
      <header className="px-6 py-4 flex justify-between items-center border-b shadow-sm bg-white">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-bold">Q</span>
          </div>
          <span className="text-2xl font-extrabold text-gray-800 tracking-tight">Queueless</span>
        </div>

        <nav className="space-x-6 text-sm font-medium text-gray-600 hidden sm:block">
          {!auth && (
            <>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {auth && (
            <>
              <Link to={role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/user'}>Dashboard</Link>
              <Link to="/feedback">Feedback</Link>
              <button onClick={handleLogout} className="text-red-600">Logout</button>
            </>
          )}
        </nav>
      </header>

      <hr className="border-t border-blue-200" />

      <main className="px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
