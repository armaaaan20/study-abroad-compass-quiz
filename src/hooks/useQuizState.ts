import { useState } from 'react';
import { Country, QuizState } from '../types/quiz';
import { quizQuestions } from '../data/quizData';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/components/ui/sonner';

const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: {},
  scores: {
    canada: 0,
    uk: 0,
    germany: 0,
    australia: 0,
    usa: 0,
    ireland: 0,
    russia: 0
  },
  result: null,
  topThreeCountries: [],
  showResults: false,
  formData: { name: '', email: '', whatsapp: '' },
  formSubmitted: false
};

export const useQuizState = (skipLeadCapture: boolean = false, leadId: string | null = null) => {
  const [state, setState] = useState<QuizState>({
    ...initialState,
    formSubmitted: skipLeadCapture
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectOption = (questionId: string, optionId: string) => {
    const currentQuestion = quizQuestions[state.currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(option => option.id === optionId);
    
    if (!selectedOption) return;
    
    // Update answers
    setState(prevState => ({
      ...prevState,
      answers: {
        ...prevState.answers,
        [questionId]: optionId
      }
    }));
    
    // Wait a bit before moving to the next question (for better UX)
    setIsAnimating(true);
    setTimeout(() => {
      // Update scores
      const newScores = { ...state.scores };
      
      Object.entries(selectedOption.scores).forEach(([country, score]) => {
        newScores[country as Country] += score;
      });
      
      // Move to next question or show results
      if (state.currentQuestionIndex < quizQuestions.length - 1) {
        setState(prevState => ({
          ...prevState,
          scores: newScores,
          currentQuestionIndex: prevState.currentQuestionIndex + 1
        }));
      } else {
        // Calculate result and top three countries
        const sortedCountries = Object.entries(newScores)
          .map(([country, score]) => ({ country: country as Country, score }))
          .sort((a, b) => {
            // Primary sort by score
            if (b.score !== a.score) {
              return b.score - a.score;
            }
            
            // Enhanced tie-breaking logic
            // For medical field preference
            if (state.answers['field'] === 'healthcare') {
              const aIsMedicalStrong = ['russia', 'germany'].includes(a.country);
              const bIsMedicalStrong = ['russia', 'germany'].includes(b.country);
              
              if (aIsMedicalStrong && !bIsMedicalStrong) return -1;
              if (!aIsMedicalStrong && bIsMedicalStrong) return 1;
            }
            
            // For research preference
            if (state.answers['research']) {
              const aIsResearchStrong = ['usa', 'uk', 'germany', 'russia'].includes(a.country);
              const bIsResearchStrong = ['usa', 'uk', 'germany', 'russia'].includes(b.country);
              
              if (aIsResearchStrong && !bIsResearchStrong) return -1;
              if (!aIsResearchStrong && bIsResearchStrong) return 1;
            }
            
            // For language considerations
            if (state.answers['language'] === 'no') {
              const aIsEnglishSpeaking = ['usa', 'uk', 'canada', 'australia', 'ireland'].includes(a.country);
              const bIsEnglishSpeaking = ['usa', 'uk', 'canada', 'australia', 'ireland'].includes(b.country);
              
              if (aIsEnglishSpeaking && !bIsEnglishSpeaking) return -1;
              if (!aIsEnglishSpeaking && bIsEnglishSpeaking) return 1;
            }
            
            // For study duration preference
            if (state.answers['study_duration']) {
              const durationPreference = state.answers['study_duration'];
              
              // Match countries with appropriate duration programs
              const aDurationMatch = 
                (durationPreference === 'short' && ['uk', 'ireland'].includes(a.country)) ||
                (durationPreference === 'medium' && ['canada', 'australia'].includes(a.country)) ||
                (durationPreference === 'long' && ['germany', 'usa', 'russia'].includes(a.country));
                
              const bDurationMatch = 
                (durationPreference === 'short' && ['uk', 'ireland'].includes(b.country)) ||
                (durationPreference === 'medium' && ['canada', 'australia'].includes(b.country)) ||
                (durationPreference === 'long' && ['germany', 'usa', 'russia'].includes(b.country));
              
              if (aDurationMatch && !bDurationMatch) return -1;
              if (!aDurationMatch && bDurationMatch) return 1;
            }
            
            // Secondary sort based on other criteria
            const aWorkOpportunity = state.answers['work'] === 'yes' && a.country === 'canada' ? 2 : 
                                   state.answers['work'] === 'yes' ? 1 : 0;
            const bWorkOpportunity = state.answers['work'] === 'yes' && b.country === 'canada' ? 2 : 
                                   state.answers['work'] === 'yes' ? 1 : 0;
            
            if (aWorkOpportunity !== bWorkOpportunity) {
              return bWorkOpportunity - aWorkOpportunity;
            }
            
            // Tertiary sort - alphabetical
            return a.country.localeCompare(b.country);
          });

        // Make sure all countries appear with at least some score for variety
        const allCountries = Object.keys(state.scores) as Country[];
        const countriesInResult = sortedCountries.map(item => item.country);
        
        // Add any missing countries to the end
        allCountries.forEach(country => {
          if (!countriesInResult.includes(country)) {
            sortedCountries.push({ country, score: 0 });
          }
        });

        const result = sortedCountries[0].country;
        // Always show all three top countries even if scores are tied at zero
        const topThree = sortedCountries.slice(0, 3).map(item => item.country);
        
        setState(prevState => ({
          ...prevState,
          scores: newScores,
          result,
          topThreeCountries: topThree,
          showResults: true
        }));
        
        // If lead was already submitted (from pre-quiz), update the best_country
        if (skipLeadCapture) {
          if (leadId) {
            // If we have a specific leadId, update that one
            updateLeadWithId(leadId, result);
          } else {
            // Otherwise find the most recent one
            updateBestCountryInDatabase(result);
          }
        }
      }
      setIsAnimating(false);
    }, 400);
  };

  // Function to update a specific lead with ID
  const updateLeadWithId = async (id: string, bestCountry: Country) => {
    try {
      console.log("Updating lead with ID:", id, "Best country:", bestCountry);
      
      const { error } = await supabase
        .from('student_leads')
        .update({ best_country: bestCountry })
        .eq('id', id);
        
      if (error) throw error;
      
      console.log("Successfully updated lead with ID:", id);
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  // Function to update best_country in database for already submitted leads
  const updateBestCountryInDatabase = async (bestCountry: Country) => {
    try {
      console.log("Updating best_country for existing lead:", bestCountry);
      
      // Query to find the most recent lead without a best_country value
      const { data: recentLeads, error: fetchError } = await supabase
        .from('student_leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (fetchError) throw fetchError;
      
      if (recentLeads && recentLeads.length > 0) {
        const leadId = recentLeads[0].id;
        
        // Update the lead with the best country
        const { error: updateError } = await supabase
          .from('student_leads')
          .update({ best_country: bestCountry })
          .eq('id', leadId);
          
        if (updateError) throw updateError;
        
        console.log("Successfully updated best_country for lead:", leadId);
      }
    } catch (error) {
      console.error('Error updating best country in database:', error);
    }
  };

  const handleLeadFormSubmit = async (name: string, email: string, whatsapp: string) => {
    try {
      setIsSubmitting(true);
      
      setState(prevState => ({
        ...prevState,
        formData: { name, email, whatsapp },
        formSubmitted: true
      }));
      
      // Show success message with animation
      toast("Thank you for your submission!", {
        description: "We'll contact you soon with free study abroad guidance.",
        duration: 5000,
      });
      
      // Store data to Supabase including the best country result
      const dataToStore = {
        name,
        email,
        whatsapp,
        best_country: state.result // This ensures the best_country is saved
      };
      
      console.log("Saving to Supabase:", dataToStore);
      
      const { error } = await supabase
        .from('student_leads')
        .insert([dataToStore]);
        
      if (error) throw error;
      
      console.log('Lead submitted successfully with best_country:', state.result);
    } catch (error) {
      console.error('Error storing lead:', error);
      toast("There was an error saving your data.", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setState({
      ...initialState,
      formSubmitted: skipLeadCapture
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousQuestion = () => {
    setState(prev => ({ 
      ...prev, 
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1) 
    }));
  };

  return {
    state,
    isAnimating,
    isSubmitting,
    handleSelectOption,
    handleLeadFormSubmit,
    resetQuiz,
    goToPreviousQuestion
  };
};
