import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-9xl font-bold text-blue-600 text-center">404</h1>
      <br></br>
      <p className="text-2xl text-gray-700 mt-4 mb-8 text-center">Page Not Found</p>
      <br></br>
      <button 
        className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
        onClick={() => window.location.href = '/'}
      >
        Return to Home
      </button>
    </div>
  );
};

export default NotFoundPage;