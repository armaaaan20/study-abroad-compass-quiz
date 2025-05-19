
import React from 'react';
import { QuizQuestion as QuizQuestionType } from '../types/quiz';
import ProgressBar from './ProgressBar';
import QuizQuestion from './QuizQuestion';

interface QuizInProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  currentQuestion: QuizQuestionType;
  selectedOptionId: string | null;
  isAnimating: boolean;
  onSelectOption: (questionId: string, optionId: string) => void;
  onPreviousClick: () => void;
}

const QuizInProgress: React.FC<QuizInProgressProps> = ({
  currentQuestionIndex,
  totalQuestions,
  currentQuestion,
  selectedOptionId,
  isAnimating,
  onSelectOption,
  onPreviousClick
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-100 p-4 sm:p-6 ${isAnimating ? 'opacity-70' : 'opacity-100'} transition-opacity duration-300`}>
      <ProgressBar 
        currentQuestion={currentQuestionIndex} 
        totalQuestions={totalQuestions} 
      />
      
      <div className="my-6 sm:my-8 animate-fade-in">
        <QuizQuestion 
          question={currentQuestion}
          selectedOptionId={selectedOptionId}
          onSelectOption={onSelectOption}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <button
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-gray-600 hover:bg-gray-100 ${currentQuestionIndex === 0 ? 'invisible' : ''}`}
          onClick={onPreviousClick}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        
        <button
          className="px-4 py-1.5 sm:px-6 sm:py-2 bg-[#174a58] text-white rounded-md hover:bg-[#3b8183] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onSelectOption(currentQuestion.id, selectedOptionId || '')}
          disabled={!selectedOptionId}
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'See Results' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizInProgress;
