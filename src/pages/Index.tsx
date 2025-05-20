
import React, { useState } from 'react';
import QuizContainer from '@/components/QuizContainer';
import Header from '@/components/Header';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const handleLeadFormSubmit = async (name: string, email: string, whatsapp: string) => {
    try {
      setIsSubmitting(true);
      // Initially save with null best_country
      const { data, error } = await supabase
        .from('student_leads')
        .insert([{ 
          name, 
          email, 
          whatsapp, 
          best_country: null // Initially null, will be updated after quiz completion
        }])
        .select();
        
      if (error) throw error;
      
      // Store the lead ID for later updating
      if (data && data.length > 0) {
        setLeadId(data[0].id);
        console.log("Created new lead with ID:", data[0].id);
      }
      
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#174a58]/5 to-[#3b8183]/10 py-4 sm:py-8 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins text-gray-800 mb-3 sm:mb-4 tracking-tight font-extrabold py-2 relative inline-block">
            <span className="bg-gradient-to-r from-[#174a58] to-[#3b8183] bg-clip-text text-transparent">
              Which Country Should You Study In?
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Take this quick quiz to discover your perfect study abroad destination based on your preferences, budget, and career goals.
          </p>
        </header>
        
        {!leadSubmitted ? (
          <div className="max-w-xl mx-auto mb-8 animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-5 mb-6">
              <LeadCaptureForm onSubmit={handleLeadFormSubmit} isPreQuiz={true} isSubmitting={isSubmitting} />
            </div>
          </div>
        ) : (
          <QuizContainer skipLeadCapture={true} leadId={leadId} />
        )}
        
        <footer className="mt-8 sm:mt-16 text-center text-gray-500 text-xs sm:text-sm pb-4">
          <p>© 2025 EduSync Study Abroad Guide. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
