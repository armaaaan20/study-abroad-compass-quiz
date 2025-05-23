
import React from 'react';
import { Card, CardContent } from './ui/card';

interface TitleCardProps {
  title: string;
  subtitle?: string;
  showImage?: boolean;
}

const TitleCard: React.FC<TitleCardProps> = ({ title, subtitle, showImage = true }) => {
  return (
    <Card className="mb-6 shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-[#174a58] to-[#3b8183] p-4 sm:p-6 text-white flex items-center">
        {showImage && (
          <div className="mr-4 flex-shrink-0">
            <img 
              src="/edu.png" 
              alt="Education Icon" 
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain animate-float"
            />
          </div>
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-sm sm:text-base opacity-90 mt-1">{subtitle}</p>}
        </div>
      </div>
      <CardContent className="p-0">
        {/* Card content will be inserted here */}
      </CardContent>
    </Card>
  );
};

export default TitleCard;
