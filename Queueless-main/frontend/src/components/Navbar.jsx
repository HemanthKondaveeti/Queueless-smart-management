import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { isAuthenticated, getUserRole, logout } from '../utils/auth';
import { 
  HomeIcon, 
  UserIcon, 
  LoginIcon, 
  LogoutIcon, 
  DashboardIcon, 
  FeedbackIcon, 
  BellIcon,
  MenuIcon,
  XIcon
} from '../components/Icons'; // Assume you have these icons

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = isAuthenticated();
  const role = getUserRole();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', name: 'Home', icon: <HomeIcon className="w-5 h-5" />, show: true },
    { path: '/login', name: 'Login', icon: <LoginIcon className="w-5 h-5" />, show: !isLoggedIn },
    { path: '/register', name: 'Register', icon: <UserIcon className="w-5 h-5" />, show: !isLoggedIn },
    { path: '/dashboard/user', name: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" />, show: isLoggedIn && role === 'USER' },
    { path: '/feedback', name: 'Feedback', icon: <FeedbackIcon className="w-5 h-5" />, show: isLoggedIn && role === 'USER' },
    { path: '/dashboard/admin', name: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" />, show: isLoggedIn && role === 'ADMIN' },
    { path: '/notifications', name: 'Notifications', icon: <BellIcon className="w-5 h-5" />, show: isLoggedIn && role === 'ADMIN' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center sticky top-0 z-50 ${
        scrolled ? 'bg-white/90 shadow-sm backdrop-blur-md' : 'bg-white/80 backdrop-blur-sm'
      } transition-all duration-300`}
    >
      {/* Logo */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <motion.div 
          whileHover={{ rotate: 15 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md"
        >
          <span className="text-white text-xl font-bold">Q</span>
        </motion.div>
        <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
          Queueless
        </span>
      </motion.div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navLinks.filter(link => link.show).map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
              location.pathname === link.path 
                ? 'text-blue-600 font-semibold bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        ))}
        
        {isLoggedIn && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          >
            <LogoutIcon className="w-5 h-5" />
            <span>Logout</span>
          </motion.button>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <XIcon className="w-6 h-6 text-gray-700" />
        ) : (
          <MenuIcon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl overflow-hidden"
          >
            <div className="flex flex-col py-2">
              {navLinks.filter(link => link.show).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-6 py-3 transition-all ${
                    location.pathname === link.path
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
              
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-6 py-3 text-red-600 hover:bg-red-50 transition-all text-left"
                >
                  <LogoutIcon className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;