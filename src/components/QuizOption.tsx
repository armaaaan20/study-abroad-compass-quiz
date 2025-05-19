
import React from 'react';
import { QuizOption as QuizOptionType } from '../types/quiz';

interface QuizOptionProps {
  option: QuizOptionType;
  selected: boolean;
  onSelect: (optionId: string) => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({ option, selected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(option.id)}
      className={`w-full text-left p-4 mb-3 rounded-lg border-2 transition-all ${
        selected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <span className="font-inter text-gray-800">{option.text}</span>
    </button>
  );
};

export default QuizOption;
