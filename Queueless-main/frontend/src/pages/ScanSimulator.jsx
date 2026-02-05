import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';

const ScanSimulator = () => {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-800"
      >
        <h2 className="text-3xl font-extrabold mb-8">QR Code Scanner Simulation</h2>
        <p>Simulate scanning tokens here. Feature coming soon!</p>
      </motion.div>
    </MainLayout>
  );
};

export default ScanSimulator;
