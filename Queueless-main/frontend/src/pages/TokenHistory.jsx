import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';

const TokenHistory = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('/tokens/history');
        setTokens(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <MainLayout>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6 text-gray-800"
      >
        Token History
      </motion.h2>

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : tokens.length === 0 ? (
        <p className="text-slate-400">No token history found.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
          {tokens.map((token) => (
            <motion.div
              key={token.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/60 text-gray-800 p-5 rounded-xl shadow-lg backdrop-blur-md"
            >
              <h4 className="font-bold text-lg mb-2">Token #{token.tokenNumber}</h4>
              <p><strong>Center:</strong> {token.centerName}</p>
              <p><strong>Department:</strong> {token.departmentName}</p>
              <p><strong>Slot:</strong> {token.slotTime}</p>
              <p><strong>Status:</strong>{' '}
                <span className={`font-semibold ${
                  token.status === 'SERVED' ? 'text-green-600' :
                  token.status === 'MISSED' ? 'text-yellow-600' :
                  'text-blue-600'
                }`}>
                  {token.status}
                </span>
              </p>
              {token.status === 'MISSED' && (
                <button
                  onClick={() => alert('Rejoin logic goes here')}
                  className="mt-3 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm text-white"
                >
                  Rejoin Queue
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default TokenHistory;
