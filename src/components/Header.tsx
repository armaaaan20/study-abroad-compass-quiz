import React from 'react';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-8 bg-gradient-to-r from-[#174a58] to-[#3b8183] p-3 sm:p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        {/* Logo image without circular shape */}
        <img
          src="/logo.png" // Replace with your image path
          alt="EduSync Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3 object-contain"
        />
        <h2 className="text-white text-lg sm:text-xl font-semibold">EduSync</h2>
      </div>
      
      <h1 className="hidden sm:block text-xl sm:text-2xl font-bold text-white">Study Abroad Destination Finder</h1>
      
      <button className="sm:hidden text-white p-1">
        <Menu size={24} />
      </button>
    </div>
  );
};

export default Header;
