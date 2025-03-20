// miracle-pilot-project-frontend/src/app/(Home)/dashboard/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  
  const handleLogout = () => {
    // Add your logout logic here
    // For example: clear local storage, cookies, etc.
    // Then redirect to login page
    router.push('/auth/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-500 mb-8">Welcome to Your Dashboard</h1>
        
        <p className="text-gray-600 text-lg mb-10">
          Empowering you with the tools and insights to make the most of your experience.
        </p>
        
        <p className="text-indigo-400 text-xl mb-12">
          For further assistance, please contact your <span className="text-indigo-500">school administration.</span>
        </p>
        
        <button 
          onClick={handleLogout}
          className="w-full py-4 px-6 rounded-lg font-medium text-white text-xl bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition-opacity"
        >
          Logout
        </button>
      </div>
    </div>
  );
}