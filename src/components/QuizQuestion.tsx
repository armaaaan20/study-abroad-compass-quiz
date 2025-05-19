
import React from 'react';
import { QuizQuestion as QuizQuestionType } from '../types/quiz';
import QuizOption from './QuizOption';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOptionId: string | null;
  onSelectOption: (questionId: string, optionId: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  selectedOptionId, 
  onSelectOption 
}) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold font-poppins mb-8 text-gray-800">{question.question}</h2>
      <div className="grid grid-cols-1 gap-4">
        {question.options.map(option => (
          <QuizOption 
            key={option.id} 
            option={option} 
            selected={selectedOptionId === option.id}
            onSelect={(optionId) => onSelectOption(question.id, optionId)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
