
import React from 'react';
import { quizQuestions } from '../data/quizData';
import QuizResults from './QuizResults';
import QuizInProgress from './QuizInProgress';
import { useQuizState } from '../hooks/useQuizState';

const QuizContainer: React.FC = () => {
  const { 
    state, 
    isAnimating, 
    handleSelectOption, 
    handleLeadFormSubmit, 
    resetQuiz,
    goToPreviousQuestion
  } = useQuizState();

  const currentQuestion = quizQuestions[state.currentQuestionIndex];
  const selectedOptionId = currentQuestion ? state.answers[currentQuestion.id] : null;

  return (
    <div className="w-full max-w-2xl mx-auto">
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
              formSubmitted={state.formSubmitted}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizContainer;
