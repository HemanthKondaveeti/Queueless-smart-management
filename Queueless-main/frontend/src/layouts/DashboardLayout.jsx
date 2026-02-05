import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { logout, getUserRole } from '../utils/auth';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const role = getUserRole();

  const navLinks = [
    { label: 'Dashboard', path: role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/user' },
    ...(role === 'ADMIN'
      ? [
          { label: 'Notifications', path: '/notifications' },
          { label: 'Scan Tokens', path: '/scan-simulator' },
        ]
      : [
          { label: 'Feedback', path: '/feedback' },
        ]),
    { label: 'Home', path: '/' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      <aside className="w-64 hidden md:flex flex-col bg-slate-900 border-r border-slate-800">
        <div className="text-2xl font-bold text-center py-6 border-b border-slate-800">Queueless</div>
        <nav className="flex-1 p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block px-4 py-2 rounded hover:bg-indigo-600 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
