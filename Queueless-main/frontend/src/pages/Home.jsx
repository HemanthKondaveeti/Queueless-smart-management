import React from 'react';
import { motion } from 'framer-motion';
import { QueueListIcon, ArrowPathIcon, ClockIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      icon: <ArrowPathIcon className="w-8 h-8 text-blue-600" />,
      title: "Live Queue Tracking",
      description: "Real-time position updates sent to your device"
    },
    {
      icon: <QueueListIcon className="w-8 h-8 text-blue-600" />,
      title: "Virtual Queuing",
      description: "Join from anywhere - no physical waiting required"
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-blue-600" />,
      title: "Time Efficiency",
      description: "45% average reduction in perceived wait times"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center mb-6"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
            <QueueListIcon className="w-10 h-10 text-blue-600" />
          </div>
          <span className="ml-3 text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Queueless
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight"
        >
          The Future of <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Queue Management
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10"
        >
          Revolutionize customer flow with our digital queuing system that eliminates crowded waiting areas and improves service efficiency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <a
            href="/login"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-200/50"
          >
            Try Demo
          </a>
          <a
            href="/register"
            className="px-8 py-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-lg transition-all transform hover:scale-105"
          >
            Business Solutions
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-blue-100 opacity-40 blur-3xl"></div>
          </div>
          <div className="relative bg-white rounded-2xl shadow-xl p-1 max-w-5xl mx-auto overflow-hidden border border-gray-100">
            <img 
              src="https://www.medicomingle.com/wp-content/uploads/2025/03/queue-management-system.png" 
              alt="Digital queue management interface showing virtual queue system" 
              className="rounded-xl w-full h-auto object-contain"
              loading="lazy"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Virtual Queue Benefits
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-blue-50 rounded-2xl p-8 text-center"
          >
            <div className="flex justify-center mb-6">
              <DevicePhoneMobileIcon className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mobile-First Queue Management</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Customers join and monitor queues from their smartphones while businesses gain powerful tools to optimize service flow and reduce physical crowding.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;