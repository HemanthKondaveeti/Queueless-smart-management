import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const NotFound = () => {
  return (
    <MainLayout>
      <div className="text-center mt-20">
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <p className="text-xl mt-4 text-gray-700">Page Not Found</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
