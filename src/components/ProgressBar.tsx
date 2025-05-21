
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  progress?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions, progress }) => {
  // Use passed progress if available, otherwise calculate based on current question
  const progressValue = progress !== undefined ? progress : ((currentQuestion + 1) / totalQuestions) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">Question {currentQuestion + 1}/{totalQuestions}</span>
        <span className="text-gray-600">{Math.round(progressValue)}% Complete</span>
      </div>
      <Progress value={progressValue} className="h-2 bg-gray-200" />
    </div>
  );
};

export default ProgressBar;
