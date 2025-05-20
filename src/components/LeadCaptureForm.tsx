
import React, { useState } from 'react';
import { Input } from './ui/input';

interface LeadCaptureFormProps {
  onSubmit: (name: string, email: string, whatsapp: string) => void;
  isPreQuiz?: boolean;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ onSubmit, isPreQuiz = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateIndianPhoneNumber = (number: string) => {
    // Indian phone number format: 10 digits, optionally starting with +91 or 0
    const pattern = /^(?:\+91|0)?[6789]\d{9}$/;
    return pattern.test(number);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!validateIndianPhoneNumber(whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid Indian phone number (+91 or 10 digits starting with 6-9)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      await onSubmit(name, email, whatsapp);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${isPreQuiz ? '' : 'bg-[#174a58]/5 border border-[#174a58]/20 rounded-lg p-5'} mb-6 animate-fade-in`}>
      <h3 className="text-center text-xl font-semibold font-poppins mb-4 text-[#174a58]">
        Get Free Study Abroad Guidance
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
            Full Name*
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-3 shadow-sm ${errors.name ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-[#3b8183]/30'} rounded-md focus:outline-none focus:ring-2 transition-all duration-200`}
            placeholder="Your name"
            disabled={isSubmitting}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name}</p>}
        </div>
        
        <div className="relative">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email Address*
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 shadow-sm ${errors.email ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-[#3b8183]/30'} rounded-md focus:outline-none focus:ring-2 transition-all duration-200`}
            placeholder="Your email address"
            disabled={isSubmitting}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
        </div>
        
        <div className="relative">
          <label htmlFor="whatsapp" className="block mb-1 text-sm font-medium text-gray-700">
            WhatsApp Number* (Indian format)
          </label>
          <div className="relative">
            <Input
              type="text"
              id="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className={`w-full px-4 py-3 pl-16 shadow-sm ${errors.whatsapp ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-[#3b8183]/30'} rounded-md focus:outline-none focus:ring-2 transition-all duration-200`}
              placeholder="10-digit number"
              disabled={isSubmitting}
            />
            <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-gray-500 border-r border-gray-300 bg-gray-50 h-full rounded-l-md pr-2 font-mono">
              +91
            </div>
          </div>
          {errors.whatsapp && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.whatsapp}</p>}
          <p className="mt-1.5 text-xs text-gray-500">Example: 9876543210 or +919876543210</p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#3b8183] text-white rounded-md hover:bg-[#174a58] transition-all duration-300 font-medium transform hover:scale-[1.01] shadow-md hover:shadow-lg active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#3b8183]/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 w-0 bg-white opacity-20 transition-all duration-300 origin-left group-hover:w-full"></div>
          <span className="relative z-10 font-medium">
            {isSubmitting ? 'Processing...' : isPreQuiz ? 'Take the Quiz' : 'Get Expert Guidance'}
          </span>
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          We'll never share your information with third parties.
        </p>
      </form>
    </div>
  );
};

export default LeadCaptureForm;
