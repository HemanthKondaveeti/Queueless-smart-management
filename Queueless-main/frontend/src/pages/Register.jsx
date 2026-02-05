import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { saveAuth } from '../utils/auth';
import { motion } from 'framer-motion';
import { 
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  IdentificationIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await axios.post('/auth/register', formData);
      const { token, role } = res.data;
      saveAuth(token, role);
      
      // Success animation before navigation
      await new Promise(resolve => setTimeout(resolve, 800));
      navigate(role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/user');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Decorative header */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"
        />
        
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-4 shadow-inner"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">Q</span>
              </div>
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Queueless</h2>
            <p className="text-gray-600">Create your account in seconds</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Register As</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdentificationIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none transition-all"
                >
                  <option value="USER">Regular User</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
            </motion.div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="pt-2"
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-md ${
                  isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                } text-white font-semibold transition-all duration-300`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    Register Now <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-6 text-center text-sm text-gray-600"
          >
            <p>
              Already have an account?{' '}
              <span
                className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors"
                onClick={() => navigate('/login')}
              >
                Sign In
              </span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;