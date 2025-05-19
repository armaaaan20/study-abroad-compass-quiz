
import React from 'react';
import QuizContainer from '@/components/QuizContainer';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#174a58]/5 to-[#3b8183]/10 py-4 sm:py-8 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <header className="text-center mb-6 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins text-gray-800 mb-3 sm:mb-4 tracking-tight font-extrabold py-2 relative inline-block">
            Which Country Should You 
            <span className="relative z-10">
              <span className="text-[#174a58] relative z-10"> Study In</span>
            </span>?
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Take this quick quiz to discover your perfect study abroad destination based on your preferences, budget, and career goals.
          </p>
        </header>
        
        <QuizContainer />
        
        <footer className="mt-8 sm:mt-16 text-center text-gray-500 text-xs sm:text-sm pb-4">
          <p>© 2025 EduSync Study Abroad Guide. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
