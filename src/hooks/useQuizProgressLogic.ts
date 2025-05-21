import { useState } from 'react';
import { QuizState, Country } from '../types/quiz';
import { quizQuestions } from '../data/quizData';
import { calculateQuizResults } from '../utils/quizScoreUtils';
import { updateLeadWithId, updateBestCountryInDatabase } from '../utils/quizDbUtils';

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

/**
 * Hook for handling quiz navigation logic
 */
export const useQuizProgressLogic = (skipLeadCapture: boolean = false, leadId: string | null = null) => {
  const [state, setState] = useState<QuizState>({
    ...initialState,
    formSubmitted: skipLeadCapture
  });
  const [isAnimating, setIsAnimating] = useState(false);

  /**
   * Handles selecting an option and advancing the quiz
   */
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
        // Calculate results
        const { result, topThree } = calculateQuizResults(newScores, updatedAnswers);
        
        // Update state with results
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

  /**
   * Resets the quiz to initial state
   */
  const resetQuiz = () => {
    setState({
      ...initialState,
      formSubmitted: skipLeadCapture
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Navigates to the previous question
   */
  const goToPreviousQuestion = () => {
    setState(prev => ({ 
      ...prev, 
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1) 
    }));
  };

  return {
    state,
    setState,
    isAnimating,
    handleSelectOption,
    resetQuiz,
    goToPreviousQuestion
  };
};
