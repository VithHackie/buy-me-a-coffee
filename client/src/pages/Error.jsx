import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 bg-[url('/images/bg.avif')] bg-cover bg-center flex flex-col items-center justify-center p-4 text-center font-sans relative z-0">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm -z-10"></div>

      <div className="relative">
        <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-widest drop-shadow-2xl select-none animate-pulse">
          404
        </h1>
      </div>
      
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl mt-4 md:mt-8 max-w-lg w-full relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-gray-300 mb-8 text-lg">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>
        
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-600 hover:scale-105 shadow-lg shadow-indigo-500/30 w-full md:w-auto"
        >
          <svg 
            className="w-5 h-5 mr-3 -ml-1" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back Home
        </a>
      </div>
    </div>
  );
}