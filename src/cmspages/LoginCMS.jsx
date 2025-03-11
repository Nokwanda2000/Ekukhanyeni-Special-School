import React from 'react';

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Background Circles */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="bg-yellow-500 rounded-full h-32 w-32 absolute -top-10 -left-10"></div>
        <div className="bg-blue-500 rounded-full h-32 w-32 absolute bottom-0 right-10 opacity-25"></div>
        <div className="bg-orange-300 rounded-full h-16 w-16 absolute top-10 right-10"></div>
        <div className="bg-blue-200 rounded-full h-12 w-12 absolute bottom-10 left-20 opacity-50"></div>
      </div>

      <h1 className="text-4xl font-bold text-center mb-4">Sign In</h1>
      <p className="text-lg text-gray-600 mb-8">Welcome please sign in...</p>

      <img src="/path/to/logo.png" alt="Logo" className="mb-6" />
      
      <div className="bg-gray-100 rounded-lg p-6 shadow-md w-80">
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Sign in</button>
      </div>
    </div>
  );
};

export default SignIn;
