import React from 'react';
import Card from '../ui/Card';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ name, role, company, text, rating = 5 }) => {
  return (
    <Card className="p-5 sm:p-8 h-full flex flex-col justify-between relative group" hover={true}>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-100 group-hover:text-primary/10 transition-colors duration-500">
        <Quote size={36} className="sm:w-12 sm:h-12" />
      </div>
      <div className="relative z-10">
        <div className="flex gap-1 mb-4 sm:mb-5">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" className="text-primary sm:w-4 sm:h-4" />
          ))}
        </div>
        <p className="text-gray-600 italic mb-6 sm:mb-8 leading-relaxed text-sm sm:text-[15px]">"{text}"</p>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 relative z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-secondary font-bold text-base sm:text-lg shrink-0">
          {name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-secondary text-sm sm:text-[15px] truncate">{name}</h4>
          <p className="text-xs sm:text-sm text-gray-400 truncate">{role}{company ? `, ${company}` : ''}</p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
