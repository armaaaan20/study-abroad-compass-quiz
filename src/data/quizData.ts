import { CountryInfo, QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "study_duration",
    question: "What is your preferred program duration?",
    options: [
      {
        id: "short",
        text: "Shorter programs (1-2 years)",
        scores: {
          canada: 0,
          uk: 2,
          germany: 0,
          australia: 1,
          usa: 0,
          ireland: 2,
          russia: 0
        }
      },
      {
        id: "medium",
        text: "Medium-length programs (2-3 years)",
        scores: {
          canada: 2,
          uk: 1,
          germany: 1,
          australia: 2,
          usa: 1,
          ireland: 1,
          russia: 1
        }
      },
      {
        id: "long",
        text: "Longer programs (4+ years)",
        scores: {
          canada: 1,
          uk: 0,
          germany: 2,
          australia: 0,
          usa: 2,
          ireland: 0,
          russia: 2
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
          ireland: 1,
          russia: 1
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
          ireland: 1,
          russia: 0
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
          ireland: 2,
          russia: 0
        }
      },
      {
        id: "healthcare",
        text: "Healthcare/Medical",
        scores: {
          canada: 2,
          uk: 1,
          germany: 2,
          australia: 2,
          usa: 1,
          ireland: 1,
          russia: 2
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
          ireland: 1,
          russia: 2
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
          ireland: 2,
          russia: 0
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
          ireland: 1,
          russia: 2
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
          ireland: 0,
          russia: 0
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
          ireland: 2,
          russia: 1
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
          ireland: 1,
          russia: 1
        }
      }
    ]
  },
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
          ireland: 1,
          russia: 2
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
          ireland: 1,
          russia: 2
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
          ireland: 2,
          russia: 1
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
          ireland: 0,
          russia: 0
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
          ireland: 2,
          russia: 1
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
          ireland: 1,
          russia: 1
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
          ireland: 1,
          russia: 0
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
          ireland: 1,
          russia: 2
        }
      }
    ]
  },
  {
    id: "research",
    question: "How important is research quality and innovation to you?",
    options: [
      {
        id: "very-important",
        text: "Very important - I want to be at cutting-edge institutions",
        scores: {
          canada: 1,
          uk: 2,
          germany: 2,
          australia: 1,
          usa: 2,
          ireland: 0,
          russia: 2
        }
      },
      {
        id: "somewhat-important",
        text: "Somewhat important",
        scores: {
          canada: 2,
          uk: 1,
          germany: 1,
          australia: 2,
          usa: 1,
          ireland: 1,
          russia: 1
        }
      },
      {
        id: "not-important",
        text: "Not important - I'm more focused on practical skills",
        scores: {
          canada: 2,
          uk: 0,
          germany: 0,
          australia: 2,
          usa: 0,
          ireland: 2,
          russia: 0
        }
      }
    ]
  },
  {
    id: "university_ranking",
    question: "How much do global university rankings matter to you?",
    options: [
      {
        id: "very-important",
        text: "Very important - I want a highly ranked university",
        scores: {
          canada: 1,
          uk: 2,
          germany: 1,
          australia: 1,
          usa: 2,
          ireland: 0,
          russia: 1
        }
      },
      {
        id: "somewhat-important",
        text: "Somewhat important - Ranking matters but isn't everything",
        scores: {
          canada: 2,
          uk: 1,
          germany: 2,
          australia: 2,
          usa: 1,
          ireland: 1,
          russia: 2
        }
      },
      {
        id: "not-important",
        text: "Not important - I'm more concerned with other factors",
        scores: {
          canada: 1,
          uk: 0,
          germany: 1,
          australia: 1,
          usa: 0,
          ireland: 2,
          russia: 2
        }
      }
    ]
  },
  {
    id: "campus_life",
    question: "What type of campus experience are you looking for?",
    options: [
      {
        id: "vibrant",
        text: "Vibrant city life with diverse cultural experiences",
        scores: {
          canada: 2,
          uk: 2,
          germany: 1,
          australia: 2,
          usa: 2,
          ireland: 1,
          russia: 1
        }
      },
      {
        id: "traditional",
        text: "Traditional university town with academic atmosphere",
        scores: {
          canada: 1,
          uk: 2,
          germany: 2,
          australia: 1,
          usa: 2,
          ireland: 2,
          russia: 2
        }
      },
      {
        id: "nature",
        text: "Campus with nature and outdoor activities nearby",
        scores: {
          canada: 2,
          uk: 1,
          germany: 1,
          australia: 2,
          usa: 1,
          ireland: 2,
          russia: 1
        }
      }
    ]
  }
];

// The countriesInfo object remains unchanged
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
      residency: "Strong pathway to permanent residency through Post-Graduation Work Permit, favored by many Indians",
      research: "Excellent research facilities with government funding in medical and STEM fields",
      university_ranking: "Several universities ranked in global top 100, particularly strong in research",
      study_duration: "Flexible programs typically 2-4 years with optional co-op terms"
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
      residency: "Graduate Immigration Route offers 2-year stay back opportunity after studies",
      research: "World-leading research institutions with centuries of academic excellence",
      university_ranking: "Home to many universities in global top 50, including Oxford and Cambridge",
      study_duration: "Efficient programs often completed in just 1 year (Masters) or 3 years (Bachelors)"
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
      residency: "Possible pathway to residency after graduation with 18-month job-seeking visa",
      research: "Exceptional research infrastructure with strong industry collaborations",
      university_ranking: "Technical universities particularly well-regarded globally",
      study_duration: "Programs typically longer (4-5 years for combined Bachelor and Master)"
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
      residency: "Post-Study Work visa options ranging from 2-4 years for Indian graduates",
      research: "Strong research capacity in environmental sciences and medicine",
      university_ranking: "Several universities in global top 50 with excellent facilities",
      study_duration: "Standard 3-year bachelor and 2-year master programs with industry connections"
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
      residency: "OPT offers 1-3 years of post-study work opportunity, with H-1B visa possibilities",
      research: "Unparalleled research output and innovation ecosystem with highest funding",
      university_ranking: "Dominates global university rankings with many institutions in top 100",
      study_duration: "Four-year bachelor's degrees and typically 2-year master's programs"
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
      residency: "Two-year stay back option after graduation, attractive to Indian students",
      research: "Growing research capacity in tech and pharmaceutical sectors",
      university_ranking: "Some universities achieving global recognition in specific fields",
      study_duration: "Standard European format with 3-4 year bachelor's and 1-2 year master's programs"
    }
  },
  russia: {
    name: "Russia",
    code: "RU",
    flag: "🇷🇺",
    color: "quiz-red",
    features: {
      budget: "Very affordable education (₹2-8 lakh per year) making it accessible for many Indian students",
      climate: "Cold winters with warm summers in most university cities",
      language: "Russian language required for most programs, though English programs are available in medicine",
      field: "World-class medical education with direct patient interaction early in training, recognized by MCI for Indian students",
      work: "Limited part-time work options but much lower cost of living",
      residency: "Limited pathways to permanent residency after graduation",
      research: "Strong tradition in fundamental sciences, mathematics and medicine with historical excellence",
      university_ranking: "Several medical universities well-recognized globally for quality education",
      study_duration: "Medical programs typically 6 years including internship, comprehensive training"
    }
  }
};
