
import React, { useState } from 'react';
import QuizContainer from '@/components/QuizContainer';
import Header from '@/components/Header';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadFormSubmit = async (name: string, email: string, whatsapp: string) => {
    try {
      const { error } = await supabase
        .from('student_leads')
        .insert([{ name, email, whatsapp, form_location: 'pre-quiz' }]);
        
      if (error) throw error;
      
      setLeadSubmitted(true);
      toast("Thank you for your information!", {
        description: "Now take our quiz to discover your perfect study destination.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error storing lead:', error);
      toast("There was an error saving your data.", {
        description: "But you can still continue with the quiz.",
      });
      // Allow them to continue with the quiz even if the lead capture fails
      setLeadSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#174a58]/5 to-[#3b8183]/10 py-4 sm:py-8 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <header className="text-center mb-6 sm:mb-8">
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
        
        {!leadSubmitted ? (
          <div className="max-w-xl mx-auto mb-8 animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-5 mb-6">
              <LeadCaptureForm onSubmit={handleLeadFormSubmit} isPreQuiz={true} />
            </div>
          </div>
        ) : (
          <QuizContainer skipLeadCapture={true} />
        )}
        
        <footer className="mt-8 sm:mt-16 text-center text-gray-500 text-xs sm:text-sm pb-4">
          <p>© 2025 EduSync Study Abroad Guide. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
