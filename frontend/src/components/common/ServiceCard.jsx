import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, description, icon: Icon, image, delay = 0 }) => {
  return (
    <Card className="group flex flex-col h-full" style={{ animationDelay: `${delay}ms` }}>
      {image && (
        <div className="h-40 sm:h-52 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent group-hover:from-secondary/20 transition-all duration-500 z-10" />
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
        </div>
      )}
      <div className="p-5 sm:p-7 flex-grow flex flex-col">
        {Icon && (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 text-primary group-hover:bg-primary group-hover:text-secondary transition-all duration-300">
            <Icon size={22} />
          </div>
        )}
        <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-secondary group-hover:text-primary-dark transition-colors duration-300">{title}</h3>
        <p className="text-gray-500 mb-4 sm:mb-6 flex-grow leading-relaxed text-sm">{description}</p>
        <Link to="/services" className="inline-flex items-center gap-2 text-primary-dark font-semibold text-sm mt-auto min-h-[44px]">
          Lihat Detail
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </Card>
  );
};

export default ServiceCard;
