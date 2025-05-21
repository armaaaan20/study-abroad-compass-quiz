
import { Country, QuizState } from '../types/quiz';

/**
 * Calculates the results based on scores, answers, and other preferences
 * @returns Object with result country and top three countries
 */
export const calculateQuizResults = (
  scores: Record<Country, number>, 
  answers: Record<string, string>
): { result: Country, topThree: Country[] } => {
  // Ensure minimum score for all countries to guarantee representation
  const allCountries = Object.keys(scores) as Country[];
  const baseMinimumScore = 1; // minimum base score to ensure all countries get some representation
  
  // Apply base scores to ensure all countries appear somewhere
  const adjustedScores = { ...scores };
  allCountries.forEach(country => {
    adjustedScores[country] += baseMinimumScore;
    
    // Apply targeted boosts based on specific user preferences
    if (answers['field'] === 'healthcare' && (country === 'russia' || country === 'germany')) {
      adjustedScores[country] += 2; // Boost for medical field preference
    }
    
    if (answers['research'] === 'very-important' && 
        ['usa', 'uk', 'germany', 'russia'].includes(country)) {
      adjustedScores[country] += 2; // Boost for research preference
    }
    
    if (answers['language'] === 'no' && 
        ['usa', 'uk', 'canada', 'australia', 'ireland'].includes(country)) {
      adjustedScores[country] += 2; // Boost for English-only preference
    }
  });

  // More sophisticated sort with multiple tiebreakers
  const sortedCountries = Object.entries(adjustedScores)
    .map(([country, score]) => ({ country: country as Country, score }))
    .sort((a, b) => {
      // Primary sort by score
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      
      // Enhanced tie-breaking logic
      // Budget consideration
      if (answers['budget']) {
        const budgetPreference = answers['budget'];
        
        // Match countries with appropriate budgets
        const aBudgetMatch = 
          (budgetPreference === 'below-10-lakh' && ['russia', 'germany'].includes(a.country)) ||
          (budgetPreference === '10-15-lakh' && ['canada', 'ireland', 'russia'].includes(a.country)) ||
          (budgetPreference === '15-25-lakh' && ['uk', 'australia'].includes(a.country)) ||
          (budgetPreference === 'over-25-lakh' && ['usa'].includes(a.country));
          
        const bBudgetMatch = 
          (budgetPreference === 'below-10-lakh' && ['russia', 'germany'].includes(b.country)) ||
          (budgetPreference === '10-15-lakh' && ['canada', 'ireland', 'russia'].includes(b.country)) ||
          (budgetPreference === '15-25-lakh' && ['uk', 'australia'].includes(b.country)) ||
          (budgetPreference === 'over-25-lakh' && ['usa'].includes(b.country));
        
        if (aBudgetMatch && !bBudgetMatch) return -1;
        if (!aBudgetMatch && bBudgetMatch) return 1;
      }
      
      // Field of study consideration
      if (answers['field']) {
        const fieldPreference = answers['field'];
        
        const aFieldMatch =
          (fieldPreference === 'stem' && ['germany', 'usa', 'canada'].includes(a.country)) ||
          (fieldPreference === 'business' && ['uk', 'usa'].includes(a.country)) ||
          (fieldPreference === 'arts' && ['uk', 'ireland'].includes(a.country)) ||
          (fieldPreference === 'healthcare' && ['russia', 'germany', 'canada', 'australia'].includes(a.country));
          
        const bFieldMatch =
          (fieldPreference === 'stem' && ['germany', 'usa', 'canada'].includes(b.country)) ||
          (fieldPreference === 'business' && ['uk', 'usa'].includes(b.country)) ||
          (fieldPreference === 'arts' && ['uk', 'ireland'].includes(b.country)) ||
          (fieldPreference === 'healthcare' && ['russia', 'germany', 'canada', 'australia'].includes(b.country));
          
        if (aFieldMatch && !bFieldMatch) return -1;
        if (!aFieldMatch && bFieldMatch) return 1;
      }
      
      // For language considerations
      if (answers['language'] === 'no') {
        const aIsEnglishSpeaking = ['usa', 'uk', 'canada', 'australia', 'ireland'].includes(a.country);
        const bIsEnglishSpeaking = ['usa', 'uk', 'canada', 'australia', 'ireland'].includes(b.country);
        
        if (aIsEnglishSpeaking && !bIsEnglishSpeaking) return -1;
        if (!aIsEnglishSpeaking && bIsEnglishSpeaking) return 1;
      }
      
      // Climate preference
      if (answers['climate']) {
        const climatePreference = answers['climate'];
        
        const aClimateMatch =
          (climatePreference === 'cold' && ['canada', 'russia'].includes(a.country)) ||
          (climatePreference === 'warm' && ['australia'].includes(a.country)) ||
          (climatePreference === 'moderate' && ['uk', 'ireland'].includes(a.country));
          
        const bClimateMatch =
          (climatePreference === 'cold' && ['canada', 'russia'].includes(b.country)) ||
          (climatePreference === 'warm' && ['australia'].includes(b.country)) ||
          (climatePreference === 'moderate' && ['uk', 'ireland'].includes(b.country));
          
        if (aClimateMatch && !bClimateMatch) return -1;
        if (!aClimateMatch && bClimateMatch) return 1;
      }
      
      // Work opportunity preference
      if (answers['work'] === 'yes') {
        const aWorkRanking = 
          a.country === 'canada' ? 3 : 
          ['australia', 'ireland'].includes(a.country) ? 2 : 
          ['uk', 'germany', 'usa'].includes(a.country) ? 1 : 0;
          
        const bWorkRanking = 
          b.country === 'canada' ? 3 : 
          ['australia', 'ireland'].includes(b.country) ? 2 : 
          ['uk', 'germany', 'usa'].includes(b.country) ? 1 : 0;
          
        if (aWorkRanking !== bWorkRanking) {
          return bWorkRanking - aWorkRanking;
        }
      }
      
      // Residency pathway preference
      if (answers['residency'] === 'yes') {
        const aResidencyRanking = 
          ['canada', 'australia'].includes(a.country) ? 3 : 
          ['germany'].includes(a.country) ? 2 : 
          ['ireland', 'usa'].includes(a.country) ? 1 : 0;
          
        const bResidencyRanking = 
          ['canada', 'australia'].includes(b.country) ? 3 : 
          ['germany'].includes(b.country) ? 2 : 
          ['ireland', 'usa'].includes(b.country) ? 1 : 0;
          
        if (aResidencyRanking !== bResidencyRanking) {
          return bResidencyRanking - aResidencyRanking;
        }
      }
      
      // Alphabetical as final tiebreaker
      return a.country.localeCompare(b.country);
    });

  const result = sortedCountries[0].country;
  const topThree = sortedCountries.slice(0, 3).map(item => item.country);
  
  return { result, topThree };
};
