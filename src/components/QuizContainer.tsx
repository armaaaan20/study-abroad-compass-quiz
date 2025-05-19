
import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizData';
import { Country, FormData, QuizState } from '../types/quiz';
import ProgressBar from './ProgressBar';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
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
    ireland: 0
  },
  result: null,
  topThreeCountries: [],
  showResults: false,
  formData: { name: '', email: '', whatsapp: '' },
  formSubmitted: false
};

const QuizContainer: React.FC = () => {
  const [state, setState] = useState<QuizState>({...initialState});
  const [isAnimating, setIsAnimating] = useState(false);

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
            
            // Secondary sort based on specific criteria
            // For example, for similar scores, prefer countries with better work opportunities
            const aWorkOpportunity = state.answers['work'] === 'work_important' && a.country === 'canada' ? 2 : 
                                     state.answers['work'] === 'work_important' ? 1 : 0;
            const bWorkOpportunity = state.answers['work'] === 'work_important' && b.country === 'canada' ? 2 : 
                                     state.answers['work'] === 'work_important' ? 1 : 0;
            
            if (aWorkOpportunity !== bWorkOpportunity) {
              return bWorkOpportunity - aWorkOpportunity;
            }
            
            // Tertiary sort - alphabetical
            return a.country.localeCompare(b.country);
          });

        const result = sortedCountries[0].country;
        const topThree = sortedCountries.slice(0, 3).map(item => item.country);
        
        setState(prevState => ({
          ...prevState,
          scores: newScores,
          result,
          topThreeCountries: topThree,
          showResults: true
        }));
      }
      setIsAnimating(false);
    }, 400);
  };

  const handleLeadFormSubmit = async (name: string, email: string, whatsapp: string) => {
    setState(prevState => ({
      ...prevState,
      formData: { name, email, whatsapp },
      formSubmitted: true
    }));
    
    // Show success message
    toast("Thank you for your submission!", {
      description: "We'll contact you soon with free study abroad guidance.",
    });
    
    // Store data to be sent to Supabase
    const dataToStore = {
      name,
      email,
      whatsapp,
      primaryCountry: state.result,
      recommendedCountries: state.topThreeCountries,
      scores: state.scores,
      answers: state.answers,
      timestamp: new Date().toISOString()
    };
    
    // Log data (will be replaced with Supabase integration)
    console.log('Lead submitted:', dataToStore);
    
    // This is where you would add the Supabase integration
    // Once Supabase is connected using the Lovable Supabase integration
    try {
      /* 
      const { error } = await supabase
        .from('study_abroad_leads')
        .insert([dataToStore]);
        
      if (error) throw error;
      */
      
      // For now, we're just logging the data
    } catch (error) {
      console.error('Error storing lead:', error);
      toast("There was an error saving your data.", {
        description: "Please try again or contact support.",
      });
    }
  };

  const resetQuiz = () => {
    setState({...initialState});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentQuestion = quizQuestions[state.currentQuestionIndex];
  const selectedOptionId = currentQuestion ? state.answers[currentQuestion.id] : null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!state.showResults ? (
        <div className={`bg-white rounded-lg shadow-lg border border-gray-100 p-6 ${isAnimating ? 'opacity-70' : 'opacity-100'} transition-opacity duration-300`}>
          <ProgressBar 
            currentQuestion={state.currentQuestionIndex} 
            totalQuestions={quizQuestions.length} 
          />
          
          <div className="my-8 animate-fade-in">
            <QuizQuestion 
              question={currentQuestion}
              selectedOptionId={selectedOptionId}
              onSelectOption={handleSelectOption}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <button
              className={`px-4 py-2 rounded text-gray-600 hover:bg-gray-100 ${state.currentQuestionIndex === 0 ? 'invisible' : ''}`}
              onClick={() => setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }))}
              disabled={state.currentQuestionIndex === 0}
            >
              Previous
            </button>
            
            <button
              className="px-6 py-2 bg-[#174a58] text-white rounded-md hover:bg-[#3b8183] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleSelectOption(currentQuestion.id, selectedOptionId || '')}
              disabled={!selectedOptionId}
            >
              {state.currentQuestionIndex === quizQuestions.length - 1 ? 'See Results' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <>
          {state.result && (
            <QuizResults
              resultCountry={state.result}
              recommendedCountries={state.topThreeCountries}
              scores={state.scores}
              answers={state.answers}
              onReset={resetQuiz}
              onFormSubmit={handleLeadFormSubmit}
              formSubmitted={state.formSubmitted}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizContainer;
