
export interface QuizOption {
  id: string;
  text: string;
  scores: Record<Country, number>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export type Country = 'canada' | 'uk' | 'germany' | 'australia' | 'usa' | 'ireland' | 'russia';

export interface CountryInfo {
  name: string;
  code: string;
  flag: string;
  color: string;
  features: Record<string, string>;
}

export interface FormData {
  name: string;
  email: string;
  whatsapp: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string>;
  scores: Record<Country, number>;
  result: Country | null;
  topThreeCountries: Country[];
  showResults: boolean;
  formData: FormData;
  formSubmitted: boolean;
}
