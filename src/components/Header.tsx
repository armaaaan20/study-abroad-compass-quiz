
import React from 'react';

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-[#174a58] to-[#3b8183] p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
          <span className="text-[#174a58] text-xl font-bold">ES</span>
        </div>
        <h2 className="text-white text-xl font-semibold hidden sm:block">EduSync</h2>
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-white">Study Abroad Destination Finder</h1>
    </div>
  );
};

export default Header;
