
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
      className={`w-full text-left p-4 mb-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-[1.02] ${
        selected 
          ? 'border-[#3b8183] bg-[#3b8183]/10 shadow-md' 
          : 'border-gray-200 hover:border-[#174a58]/30 hover:bg-gray-50'
      }`}
    >
      <span className="font-inter text-gray-800">{option.text}</span>
    </button>
  );
};

export default QuizOption;
