import React, { useState, useEffect } from 'react';
import { Country } from '../types/quiz';
import { countriesInfo } from '../data/quizData';
import LeadCaptureForm from './LeadCaptureForm';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { CheckCircle } from 'lucide-react';

interface QuizResultsProps {
  resultCountry: Country;
  recommendedCountries: Country[];
  scores: Record<Country, number>;
  answers: Record<string, string>;
  onReset: () => void;
  onFormSubmit: (name: string, email: string, whatsapp: string) => void;
  formSubmitted: boolean;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  resultCountry, 
  recommendedCountries,
  scores,
  answers, 
  onReset,
  onFormSubmit,
  formSubmitted
}) => {
  const [activeTab, setActiveTab] = useState<Country>(resultCountry);
  const [isMobile, setIsMobile] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Check if mobile screen when component mounts and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Trigger animation completion after delay for staggered animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Change active tab with animation effects
  const handleTabChange = (country: Country) => {
    setAnimationComplete(false);
    setActiveTab(country);
    setTimeout(() => setAnimationComplete(true), 300);
  };
  
  const getMatchReasons = (country: Country) => {
    const countryInfo = countriesInfo[country];
    const reasons = [];
    if (answers.study_duration) reasons.push(countryInfo.features.study_duration);
    if (answers.field) reasons.push(countryInfo.features.field);
    if (answers.budget) reasons.push(countryInfo.features.budget);
    if (answers.climate) reasons.push(countryInfo.features.climate);
    if (answers.language) reasons.push(countryInfo.features.language);
    if (answers.work) reasons.push(countryInfo.features.work);
    if (answers.residency) reasons.push(countryInfo.features.residency);
    if (answers.research) reasons.push(countryInfo.features.research);
    if (answers.university_ranking) reasons.push(countryInfo.features.university_ranking);
    
    return reasons;
  };

  const shareResult = () => {
    const text = `I should study in ${countriesInfo[resultCountry].name} ${countriesInfo[resultCountry].flag} according to this quiz! Find out where you should study: `;
    const url = window.location.href;
    
    // Share via WhatsApp
    try {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + url)}`, '_blank');
    } catch (error) {
      console.error('Failed to share via WhatsApp:', error);
    }
  };

  const shareViaEmail = () => {
    const subject = `I should study in ${countriesInfo[resultCountry].name}!`;
    const body = `According to this quiz, I should study in ${countriesInfo[resultCountry].name} ${countriesInfo[resultCountry].flag}!\n\nTake the quiz and find out where you should study: ${window.location.href}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Calculate max score for percentage
  const totalMaxScore = Object.values(scores).reduce((max, score) => Math.max(max, score), 0);

  return (
    <div className="animate-fade-in">
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-100 mb-6 relative overflow-hidden">
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f0f4f5]/50 to-transparent animate-pulse opacity-70 pointer-events-none"></div>
        
        <div className="text-center mb-6 relative">
          <div className="text-5xl sm:text-7xl mb-2 animate-bounce-gentle">
            {countriesInfo[resultCountry].flag}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-poppins bg-gradient-to-r from-[#174a58] to-[#3b8183] bg-clip-text text-transparent mb-2 animate-reveal-text">
            You should study in {countriesInfo[resultCountry].name}!
          </h2>
          <p className="text-gray-500">Based on your answers, these are your best matches:</p>
        </div>

        {/* Country Tabs - Improved for Mobile */}
        {isMobile ? (
          <div className="relative mb-6">
            {/* Left shadow gradient for scroll indication */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-10 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
            
            {/* Right shadow gradient for scroll indication */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-10 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
            
            <ScrollArea className="w-full">
              <div className="flex space-x-1 pb-2 px-4 min-w-max">
                {recommendedCountries.map((country, index) => (
                  <button
                    key={country}
                    className={`py-2 px-3 text-sm font-medium flex items-center justify-center border-b-2 rounded-t-md transition-all duration-300 min-w-[100px] ${
                      activeTab === country
                        ? 'border-[#3b8183] text-[#174a58] bg-[#3b8183]/10 shadow-md transform -translate-y-0.5'
                        : 'border-transparent text-gray-500 hover:text-[#174a58] hover:bg-gray-50'
                    }`}
                    onClick={() => handleTabChange(country)}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationName: 'slideInFromBottom',
                      animationDuration: '0.5s',
                      animationTimingFunction: 'ease-out',
                      animationFillMode: 'both'
                    }}
                  >
                    <span className="mr-1">{countriesInfo[country].flag}</span>
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px]">
                      {countriesInfo[country].name}
                    </span>
                    <span className="ml-1 text-xs">
                      ({Math.round((scores[country] / totalMaxScore) * 100)}%)
                    </span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <Tabs defaultValue={resultCountry} onValueChange={(value) => handleTabChange(value as Country)} className="w-full mb-4">
            <TabsList className="w-full flex justify-center bg-[#f0f4f5]">
              {recommendedCountries.map((country, index) => (
                <TabsTrigger 
                  key={country} 
                  value={country}
                  className={`transition-all duration-300 data-[state=active]:animate-tab-active ${
                    activeTab === country ? 'data-[state=active]:bg-[#3b8183]/10 data-[state=active]:text-[#174a58]' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationName: 'slideInFromBottom',
                    animationDuration: '0.5s',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'both'
                  }}
                >
                  <span className="mr-1">{countriesInfo[country].flag}</span>
                  {countriesInfo[country].name}
                  <span className="ml-1 text-xs">
                    ({Math.round((scores[country] / totalMaxScore) * 100)}%)
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
        
        {/* Active Country Details */}
        <div className="mb-6 animate-fade-in relative">
          <h3 className="text-lg sm:text-xl font-semibold font-poppins mb-3 text-gray-700">
            Why {countriesInfo[activeTab].name} is great for you:
          </h3>
          <ul className="space-y-2">
            {getMatchReasons(activeTab).map((reason, index) => (
              <li 
                key={index} 
                className={`flex items-start transition-all transform ${
                  animationComplete ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transitionProperty: 'all',
                  transitionDuration: '0.4s'
                }}
              >
                <span className="text-[#3b8183] mr-2 mt-0.5 flex-shrink-0">
                  <CheckCircle size={18} className="animate-pulse-subtle" />
                </span>
                <span className="text-sm sm:text-base hover:text-[#174a58] transition-colors duration-300">
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {!formSubmitted ? (
          <LeadCaptureForm onSubmit={onFormSubmit} />
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center mb-6 animate-scale-in">
            <div className="inline-block mb-2 animate-bounce-gentle">
              <CheckCircle size={28} className="text-green-500 mx-auto" />
            </div>
            <p className="text-green-700 font-medium">Thanks! We'll be in touch with guidance about studying in {countriesInfo[resultCountry].name}!</p>
          </div>
        )}
        
        <div className="text-center space-y-4">
          <div>
            <p className="text-gray-600 mb-2">Share your result with friends:</p>
            <div className="flex justify-center space-x-3 sm:space-x-4">
              <button 
                onClick={shareResult} 
                className="p-2 sm:p-3 bg-green-500 rounded-full text-white hover:bg-green-600 transition transform hover:scale-110 animate-shimmer"
                title="Share via WhatsApp"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </button>
              <button 
                onClick={shareViaEmail} 
                className="p-2 sm:p-3 bg-[#174a58] rounded-full text-white hover:bg-[#3b8183] transition transform hover:scale-110 animate-shimmer"
                style={{ animationDelay: "200ms" }}
                title="Share via Email"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <button 
            onClick={onReset} 
            className="mt-6 px-5 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition font-medium transform hover:scale-105 active:scale-95"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
