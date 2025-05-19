
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
  showResults: false,
  formData: { name: '', email: '', whatsapp: '' },
  formSubmitted: false
};

const QuizContainer: React.FC = () => {
  const [state, setState] = useState<QuizState>({...initialState});

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
        // Calculate result
        let maxScore = 0;
        let result: Country = 'canada'; // Default
        
        Object.entries(newScores).forEach(([country, score]) => {
          if (score > maxScore) {
            maxScore = score;
            result = country as Country;
          }
        });
        
        setState(prevState => ({
          ...prevState,
          scores: newScores,
          result,
          showResults: true
        }));
      }
    }, 400);
  };

  const handleLeadFormSubmit = (name: string, email: string, whatsapp: string) => {
    setState(prevState => ({
      ...prevState,
      formData: { name, email, whatsapp },
      formSubmitted: true
    }));
    
    // Show success message
    toast("Thank you!", {
      description: "We'll contact you soon with free study abroad guidance.",
    });
    
    // In a real app, you would submit this data to a server
    console.log('Lead submitted:', { name, email, whatsapp, country: state.result });
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
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
          <ProgressBar 
            currentQuestion={state.currentQuestionIndex} 
            totalQuestions={quizQuestions.length} 
          />
          
          <div className="my-8">
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
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
