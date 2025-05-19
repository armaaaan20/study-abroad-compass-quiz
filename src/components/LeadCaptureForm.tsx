
import React, { useState } from 'react';

interface LeadCaptureFormProps {
  onSubmit: (name: string, email: string, whatsapp: string) => void;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      newErrors.whatsapp = 'Please enter a valid Indian phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(name, email, whatsapp);
    }
  };

  return (
    <div className="bg-[#174a58]/5 border border-[#174a58]/20 rounded-lg p-5 mb-6 animate-fade-in">
      <h3 className="text-center text-xl font-semibold font-poppins mb-4 text-[#174a58]">
        Get Free Study Abroad Guidance
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
            Full Name*
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#3b8183]`}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#3b8183]`}
            placeholder="Your email address"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="whatsapp" className="block mb-1 text-sm font-medium text-gray-700">
            WhatsApp Number* (Indian format)
          </label>
          <input
            type="text"
            id="whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#3b8183]`}
            placeholder="+91 or 10-digit number"
          />
          {errors.whatsapp && <p className="mt-1 text-xs text-red-500">{errors.whatsapp}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-[#3b8183] text-white rounded-md hover:bg-[#174a58] transition-colors duration-300 font-medium transform hover:scale-[1.01]"
        >
          Get Expert Guidance
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          We'll never share your information with third parties.
        </p>
      </form>
    </div>
  );
};

export default LeadCaptureForm;
