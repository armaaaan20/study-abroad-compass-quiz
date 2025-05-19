
import { CountryInfo, QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "budget",
    question: "What is your estimated study budget per year (in USD)?",
    options: [
      {
        id: "below-10k",
        text: "Below $10,000",
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
        id: "10k-20k",
        text: "$10,000–$20,000",
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
        id: "20k-30k",
        text: "$20,000–$30,000",
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
        id: "over-30k",
        text: "Over $30,000",
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
      budget: "Affordable tuition with great work opportunities",
      climate: "Four distinct seasons with beautiful natural landscapes",
      language: "English and French are official languages",
      field: "World-class universities excelling in STEM and healthcare",
      work: "Up to 20 hours per week during studies",
      residency: "Strong pathway to permanent residency through Post-Graduation Work Permit"
    }
  },
  uk: {
    name: "United Kingdom",
    code: "UK",
    flag: "🇬🇧",
    color: "quiz-blue",
    features: {
      budget: "Higher tuition but shorter duration programs",
      climate: "Mild and moderate climate year-round",
      language: "English-speaking environment",
      field: "Prestigious universities with excellent business and arts programs",
      work: "Up to 20 hours per week during term time",
      residency: "Limited permanent residency pathways"
    }
  },
  germany: {
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    color: "quiz-amber",
    features: {
      budget: "Low or no tuition fees at public universities",
      climate: "Cold winters and mild summers",
      language: "Many programs require German proficiency",
      field: "Strong engineering and technical education",
      work: "Up to 120 full days or 240 half days per year",
      residency: "Possible pathway to residency after graduation"
    }
  },
  australia: {
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    color: "quiz-teal",
    features: {
      budget: "Higher cost but excellent employment opportunities",
      climate: "Warm and sunny year-round in most areas",
      language: "English-speaking environment",
      field: "High-quality education across all fields",
      work: "Up to 40 hours per fortnight during term",
      residency: "Potential pathways to permanent residency"
    }
  },
  usa: {
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    color: "quiz-blue",
    features: {
      budget: "Higher tuition costs especially at top universities",
      climate: "Diverse climate zones across the country",
      language: "English-speaking environment",
      field: "World-renowned universities for STEM and business",
      work: "Limited on-campus work options",
      residency: "Challenging but possible pathway to residency"
    }
  },
  ireland: {
    name: "Ireland",
    code: "IE",
    flag: "🇮🇪",
    color: "quiz-emerald",
    features: {
      budget: "Moderate tuition fees with scholarships available",
      climate: "Mild, temperate climate with frequent rainfall",
      language: "English-speaking environment",
      field: "Strong in arts, humanities and technology",
      work: "Up to 20 hours per week during term time",
      residency: "Two-year stay back option after graduation"
    }
  }
};
