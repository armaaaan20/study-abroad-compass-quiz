
import { CountryInfo, QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "budget",
    question: "What is your estimated study budget per year (in INR)?",
    options: [
      {
        id: "below-8-lakh",
        text: "Below ₹8 lakh",
        scores: {
          canada: 0,
          uk: 0,
          germany: 2,
          australia: 0,
          usa: 0,
          ireland: 1
        }
      },
      {
        id: "8-16-lakh",
        text: "₹8 lakh–₹16 lakh",
        scores: {
          canada: 2,
          uk: 1,
          germany: 1,
          australia: 2,
          usa: 0,
          ireland: 1
        }
      },
      {
        id: "16-25-lakh",
        text: "₹16 lakh–₹25 lakh",
        scores: {
          canada: 1,
          uk: 2,
          germany: 0,
          australia: 1,
          usa: 1,
          ireland: 2
        }
      },
      {
        id: "over-25-lakh",
        text: "Over ₹25 lakh",
        scores: {
          canada: 0,
          uk: 1,
          germany: 0,
          australia: 1,
          usa: 2,
          ireland: 0
        }
      }
    ]
  },
  {
    id: "climate",
    question: "Which climate do you prefer?",
    options: [
      {
        id: "cold",
        text: "Cold",
        scores: {
          canada: 2,
          uk: 1,
          germany: 2,
          australia: 0,
          usa: 1,
          ireland: 1
        }
      },
      {
        id: "warm",
        text: "Warm",
        scores: {
          canada: 0,
          uk: 0,
          germany: 0,
          australia: 2,
          usa: 1,
          ireland: 0
        }
      },
      {
        id: "moderate",
        text: "Moderate",
        scores: {
          canada: 1,
          uk: 2,
          germany: 1,
          australia: 1,
          usa: 1,
          ireland: 2
        }
      },
      {
        id: "no-preference",
        text: "No preference",
        scores: {
          canada: 1,
          uk: 1,
          germany: 1,
          australia: 1,
          usa: 1,
          ireland: 1
        }
      }
    ]
  },
  {
    id: "language",
    question: "Are you open to learning a new language for study?",
    options: [
      {
        id: "yes",
        text: "Yes",
        scores: {
          canada: 1,
          uk: 1,
          germany: 2,
          australia: 1,
          usa: 1,
          ireland: 1
        }
      },
      {
        id: "no",
        text: "No",
        scores: {
          canada: 2,
          uk: 2,
          germany: 0,
          australia: 2,
          usa: 2,
          ireland: 2
        }
      }
    ]
  },
  {
    id: "field",
    question: "What is your preferred field of study?",
    options: [
      {
        id: "stem",
        text: "STEM (Engineering, IT, etc.)",
        scores: {
          canada: 2,
          uk: 1,
          germany: 2,
          australia: 2,
          usa: 2,
          ireland: 1
        }
      },
      {
        id: "business",
        text: "Business or Management",
        scores: {
          canada: 1,
          uk: 2,
          germany: 1,
          australia: 1,
          usa: 2,
          ireland: 1
        }
      },
      {
        id: "arts",
        text: "Arts or Humanities",
        scores: {
          canada: 1,
          uk: 2,
          germany: 1,
          australia: 1,
          usa: 1,
          ireland: 2
        }
      },
      {
        id: "healthcare",
        text: "Healthcare/Medical",
        scores: {
          canada: 2,
          uk: 1,
          germany: 1,
          australia: 2,
          usa: 1,
          ireland: 1
        }
      }
    ]
  },
  {
    id: "work",
    question: "Do you plan to work part-time during your studies?",
    options: [
      {
        id: "yes",
        text: "Yes",
        scores: {
          canada: 2,
          uk: 1,
          germany: 1,
          australia: 2,
          usa: 1,
          ireland: 2
        }
      },
      {
        id: "no",
        text: "No",
        scores: {
          canada: 1,
          uk: 1,
          germany: 1,
          australia: 1,
          usa: 1,
          ireland: 1
        }
      }
    ]
  },
  {
    id: "residency",
    question: "Do you want a pathway to permanent residency after study?",
    options: [
      {
        id: "yes",
        text: "Yes",
        scores: {
          canada: 2,
          uk: 0,
          germany: 1,
          australia: 2,
          usa: 1,
          ireland: 1
        }
      },
      {
        id: "no",
        text: "No",
        scores: {
          canada: 1,
          uk: 2,
          germany: 1,
          australia: 1,
          usa: 1,
          ireland: 1
        }
      }
    ]
  }
];

export const countriesInfo: Record<string, CountryInfo> = {
  canada: {
    name: "Canada",
    code: "CA",
    flag: "🇨🇦",
    color: "quiz-red",
    features: {
      budget: "Affordable tuition (₹8-16 lakh per year) with great work opportunities for Indian students",
      climate: "Four distinct seasons with beautiful natural landscapes",
      language: "English-speaking environment, welcoming to Indian students",
      field: "World-class universities excelling in STEM and healthcare, popular among Indian students",
      work: "Up to 20 hours per week during studies, good for Indian students seeking financial support",
      residency: "Strong pathway to permanent residency through Post-Graduation Work Permit, favored by many Indians"
    }
  },
  uk: {
    name: "United Kingdom",
    code: "UK",
    flag: "🇬🇧",
    color: "quiz-blue",
    features: {
      budget: "Higher tuition (₹15-25 lakh per year) but shorter duration programs and special scholarships for Indian students",
      climate: "Mild and moderate climate year-round",
      language: "English-speaking environment with large Indian diaspora community",
      field: "Prestigious universities with excellent business and arts programs with strong recognition in India",
      work: "Up to 20 hours per week during term time, good for supporting studies",
      residency: "Graduate Immigration Route offers 2-year stay back opportunity after studies"
    }
  },
  germany: {
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    color: "quiz-amber",
    features: {
      budget: "Low or no tuition fees (₹2-7 lakh per year) at public universities, attractive for budget-conscious Indian students",
      climate: "Cold winters and mild summers",
      language: "Many programs require German proficiency, though English programs are increasing",
      field: "Strong engineering and technical education valued by Indian employers",
      work: "Up to 120 full days or 240 half days per year, sufficient for part-time work",
      residency: "Possible pathway to residency after graduation with 18-month job-seeking visa"
    }
  },
  australia: {
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    color: "quiz-teal",
    features: {
      budget: "Higher cost (₹15-25 lakh per year) but excellent employment opportunities for Indian graduates",
      climate: "Warm and sunny year-round in most areas, similar to parts of India",
      language: "English-speaking environment with large Indian community",
      field: "High-quality education across all fields with strong recognition in India",
      work: "Up to 40 hours per fortnight during term, good for financial support",
      residency: "Post-Study Work visa options ranging from 2-4 years for Indian graduates"
    }
  },
  usa: {
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    color: "quiz-blue",
    features: {
      budget: "Higher tuition costs (₹20-45 lakh per year) especially at top universities",
      climate: "Diverse climate zones across the country",
      language: "English-speaking environment with vibrant Indian community",
      field: "World-renowned universities for STEM and business, highly valued by Indian employers",
      work: "Limited on-campus work options during studies",
      residency: "OPT offers 1-3 years of post-study work opportunity, with H-1B visa possibilities"
    }
  },
  ireland: {
    name: "Ireland",
    code: "IE",
    flag: "🇮🇪",
    color: "quiz-emerald",
    features: {
      budget: "Moderate tuition fees (₹10-18 lakh per year) with scholarships available for Indian students",
      climate: "Mild, temperate climate with frequent rainfall",
      language: "English-speaking environment with growing Indian community",
      field: "Strong in technology, pharmaceuticals, and business, sectors valuable for Indian career growth",
      work: "Up to 20 hours per week during term time, good for supporting studies",
      residency: "Two-year stay back option after graduation, attractive to Indian students"
    }
  }
};
