
import React from 'react';
import { quizQuestions } from '../data/quizData';
import QuizResults from './QuizResults';
import QuizInProgress from './QuizInProgress';
import { useQuizState } from '../hooks/useQuizState';

interface QuizContainerProps {
  skipLeadCapture?: boolean;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ skipLeadCapture = false }) => {
  const { 
    state, 
    isAnimating, 
    handleSelectOption, 
    handleLeadFormSubmit, 
    resetQuiz,
    goToPreviousQuestion
  } = useQuizState(skipLeadCapture);

  const currentQuestion = quizQuestions[state.currentQuestionIndex];
  const selectedOptionId = currentQuestion ? state.answers[currentQuestion.id] : null;

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-0">
      {!state.showResults ? (
        <QuizInProgress
          currentQuestionIndex={state.currentQuestionIndex}
          totalQuestions={quizQuestions.length}
          currentQuestion={currentQuestion}
          selectedOptionId={selectedOptionId}
          isAnimating={isAnimating}
          onSelectOption={handleSelectOption}
          onPreviousClick={goToPreviousQuestion}
        />
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
              formSubmitted={state.formSubmitted || skipLeadCapture}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizContainer;
