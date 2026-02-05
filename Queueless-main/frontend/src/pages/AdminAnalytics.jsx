import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import MainLayout from '../layouts/MainLayout';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

const AdminAnalytics = () => {
  const [data, setData] = useState({
    peakHours: [],
    serviceStats: [],
    tokenStatus: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('/admin/analytics');
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-gray-800"
      >
        <h2 className="text-4xl font-extrabold mb-10 text-slate-800 tracking-tight">Analytics Overview</h2>

        {/* Peak Booking Hours */}
        <div className="mb-12 p-6 bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-blue-100">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">📈 Peak Booking Hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.peakHours}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Service Usage */}
        <div className="mb-12 p-6 bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-blue-100">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">📊 Service Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.serviceStats}
                dataKey="count"
                nameKey="service"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.serviceStats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Token Status */}
        <div className="p-6 bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-blue-100">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">📦 Token Status Summary</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.tokenStatus}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default AdminAnalytics;
