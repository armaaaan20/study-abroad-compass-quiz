
import React from 'react';
import QuizContainer from '@/components/QuizContainer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gray-800 mb-4 tracking-tight">
            Which Country Should You <span className="text-blue-600">Study In</span>?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take this quick quiz to discover your perfect study abroad destination based on your preferences, budget, and career goals.
          </p>
        </header>
        
        <QuizContainer />
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2025 Study Abroad Guide. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
