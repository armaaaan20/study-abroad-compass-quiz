
import React from 'react';
import QuizContainer from '@/components/QuizContainer';
import Header from '@/components/Header';

const Index = () => {
  return <div className="min-h-screen bg-gradient-to-b from-[#174a58]/5 to-[#3b8183]/10 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-poppins text-gray-800 mb-4 tracking-tight font-extrabold md:text-5xl py-2 relative inline-block">
            Which Country Should You 
            <span className="relative z-10">
              <span className="text-[#174a58] relative z-10"> Study In</span>
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#3b8183]/20 -z-10 transform -rotate-1"></span>
            </span>?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take this quick quiz to discover your perfect study abroad destination based on your preferences, budget, and career goals.
          </p>
        </header>
        
        <QuizContainer />
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2025 EduSync Study Abroad Guide. All rights reserved.</p>
        </footer>
      </div>
    </div>;
};

export default Index;
