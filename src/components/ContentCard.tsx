
import React, { ReactNode } from 'react';
import TitleCard from './TitleCard';
import { CardContent } from './ui/card';

interface ContentCardProps {
  title: string;
  subtitle?: string;
  showImage?: boolean;
  children: ReactNode;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  title, 
  subtitle, 
  showImage = true,
  children 
}) => {
  return (
    <TitleCard title={title} subtitle={subtitle} showImage={showImage}>
      <CardContent className="p-4 sm:p-6">
        {children}
      </CardContent>
    </TitleCard>
  );
};

export default ContentCard;
