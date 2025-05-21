
import { useState } from 'react';
import { storeLeadInDatabase } from '../utils/quizDbUtils';
import { useQuizProgressLogic } from './useQuizProgressLogic';

/**
 * Main hook for quiz state management that combines quiz progress logic and form submission
 */
export const useQuizState = (skipLeadCapture: boolean = false, leadId: string | null = null) => {
  const {
    state,
    setState,
    isAnimating,
    handleSelectOption,
    resetQuiz,
    goToPreviousQuestion
  } = useQuizProgressLogic(skipLeadCapture, leadId);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles form submission for lead capture
   */
  const handleLeadFormSubmit = async (name: string, email: string, whatsapp: string) => {
    try {
      setIsSubmitting(true);
      
      // Update state with form data
      setState(prevState => ({
        ...prevState,
        formData: { name, email, whatsapp },
        formSubmitted: true
      }));
      
      // Store lead in database
      await storeLeadInDatabase(name, email, whatsapp, state.result);
    } catch (error) {
      console.error('Error in lead form submission:', error);
    } finally {
      setIsSubmitting(false);
    }
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
