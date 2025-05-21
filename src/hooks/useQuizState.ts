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
    
    // Update answers immediately 
    const updatedAnswers = {
      ...state.answers,
      [questionId]: optionId
    };
    
    // Update state with new answers immediately
    setState(prevState => ({
      ...prevState,
      answers: updatedAnswers
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
        // Enhanced result calculation logic
        calculateResultsAndUpdateState(newScores, updatedAnswers, skipLeadCapture, leadId);
      }
      setIsAnimating(false);
    }, 400);
  };

  // Separate function for calculating results to make code more modular
  const calculateResultsAndUpdateState = (
    scores: Record<Country, number>, 
    answers: Record<string, string>, 
    skipLeadCapture: boolean, 
    leadId: string | null
  ) => {
    // Ensure minimum score for all countries to guarantee representation
    const allCountries = Object.keys(scores) as Country[];
    const baseMinimumScore = 1; // minimum base score to ensure all countries get some representation
    
    // Apply base scores to ensure all countries appear somewhere
    const adjustedScores = { ...scores };
    allCountries.forEach(country => {
      adjustedScores[country] += baseMinimumScore;
      
      // Apply targeted boosts based on specific user preferences
      if (answers['field'] === 'healthcare' && (country === 'russia' || country === 'germany')) {
        adjustedScores[country] += 2; // Boost for medical field preference
      }
      
      if (answers['research'] === 'very-important' && 
          ['usa', 'uk', 'germany', 'russia'].includes(country)) {
        adjustedScores[country] += 2; // Boost for research preference
      }
      
      if (answers['language'] === 'no' && 
          ['usa', 'uk', 'canada', 'australia', 'ireland'].includes(country)) {
        adjustedScores[country] += 2; // Boost for English-only preference
      }
    });

    // More sophisticated sort with multiple tiebreakers
    const sortedCountries = Object.entries(adjustedScores)
      .map(([country, score]) => ({ country: country as Country, score }))
      .sort((a, b) => {
        // Primary sort by score
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        
        // Enhanced tie-breaking logic
        // Budget consideration
        if (answers['budget']) {
          const budgetPreference = answers['budget'];
          
          // Match countries with appropriate budgets
          const aBudgetMatch = 
            (budgetPreference === 'below-10-lakh' && ['russia', 'germany'].includes(a.country)) ||
            (budgetPreference === '10-15-lakh' && ['canada', 'ireland', 'russia'].includes(a.country)) ||
            (budgetPreference === '15-25-lakh' && ['uk', 'australia'].includes(a.country)) ||
            (budgetPreference === 'over-25-lakh' && ['usa'].includes(a.country));
            
          const bBudgetMatch = 
            (budgetPreference === 'below-10-lakh' && ['russia', 'germany'].includes(b.country)) ||
            (budgetPreference === '10-15-lakh' && ['canada', 'ireland', 'russia'].includes(b.country)) ||
            (budgetPreference === '15-25-lakh' && ['uk', 'australia'].includes(b.country)) ||
            (budgetPreference === 'over-25-lakh' && ['usa'].includes(b.country));
          
          if (aBudgetMatch && !bBudgetMatch) return -1;
          if (!aBudgetMatch && bBudgetMatch) return 1;
        }
        
        // Field of study consideration
        if (answers['field']) {
          const fieldPreference = answers['field'];
          
          const aFieldMatch =
            (fieldPreference === 'stem' && ['germany', 'usa', 'canada'].includes(a.country)) ||
            (fieldPreference === 'business' && ['uk', 'usa'].includes(a.country)) ||
            (fieldPreference === 'arts' && ['uk', 'ireland'].includes(a.country)) ||
            (fieldPreference === 'healthcare' && ['russia', 'germany', 'canada', 'australia'].includes(a.country));
            
          const bFieldMatch =
            (fieldPreference === 'stem' && ['germany', 'usa', 'canada'].includes(b.country)) ||
            (fieldPreference === 'business' && ['uk', 'usa'].includes(b.country)) ||
            (fieldPreference === 'arts' && ['uk', 'ireland'].includes(b.country)) ||
            (fieldPreference === 'healthcare' && ['russia', 'germany', 'canada', 'australia'].includes(b.country));
            
          if (aFieldMatch && !bFieldMatch) return -1;
          if (!aFieldMatch && bFieldMatch) return 1;
        }
        
        // For language considerations
        if (answers['language'] === 'no') {
          const aIsEnglishSpeaking = ['usa', 'uk', 'canada', 'australia', 'ireland'].includes(a.country);
          const bIsEnglishSpeaking = ['usa', 'uk', 'canada', 'australia', 'ireland'].includes(b.country);
          
          if (aIsEnglishSpeaking && !bIsEnglishSpeaking) return -1;
          if (!aIsEnglishSpeaking && bIsEnglishSpeaking) return 1;
        }
        
        // Climate preference
        if (answers['climate']) {
          const climatePreference = answers['climate'];
          
          const aClimateMatch =
            (climatePreference === 'cold' && ['canada', 'russia'].includes(a.country)) ||
            (climatePreference === 'warm' && ['australia'].includes(a.country)) ||
            (climatePreference === 'moderate' && ['uk', 'ireland'].includes(a.country));
            
          const bClimateMatch =
            (climatePreference === 'cold' && ['canada', 'russia'].includes(b.country)) ||
            (climatePreference === 'warm' && ['australia'].includes(b.country)) ||
            (climatePreference === 'moderate' && ['uk', 'ireland'].includes(b.country));
            
          if (aClimateMatch && !bClimateMatch) return -1;
          if (!aClimateMatch && bClimateMatch) return 1;
        }
        
        // Work opportunity preference
        if (answers['work'] === 'yes') {
          const aWorkRanking = 
            a.country === 'canada' ? 3 : 
            ['australia', 'ireland'].includes(a.country) ? 2 : 
            ['uk', 'germany', 'usa'].includes(a.country) ? 1 : 0;
            
          const bWorkRanking = 
            b.country === 'canada' ? 3 : 
            ['australia', 'ireland'].includes(b.country) ? 2 : 
            ['uk', 'germany', 'usa'].includes(b.country) ? 1 : 0;
            
          if (aWorkRanking !== bWorkRanking) {
            return bWorkRanking - aWorkRanking;
          }
        }
        
        // Residency pathway preference
        if (answers['residency'] === 'yes') {
          const aResidencyRanking = 
            ['canada', 'australia'].includes(a.country) ? 3 : 
            ['germany'].includes(a.country) ? 2 : 
            ['ireland', 'usa'].includes(a.country) ? 1 : 0;
            
          const bResidencyRanking = 
            ['canada', 'australia'].includes(b.country) ? 3 : 
            ['germany'].includes(b.country) ? 2 : 
            ['ireland', 'usa'].includes(b.country) ? 1 : 0;
            
          if (aResidencyRanking !== bResidencyRanking) {
            return bResidencyRanking - aResidencyRanking;
          }
        }
        
        // Alphabetical as final tiebreaker
        return a.country.localeCompare(b.country);
      });

    const result = sortedCountries[0].country;
    const topThree = sortedCountries.slice(0, 3).map(item => item.country);
    
    // Update the state with the results
    setState(prevState => ({
      ...prevState,
      scores: adjustedScores,
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
