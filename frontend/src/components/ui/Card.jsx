import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <div className={`
      bg-white rounded-2xl shadow-card border border-gray-100/80 overflow-hidden
      ${hover ? 'transition-all duration-300 ease-in-out hover:shadow-card-hover hover:-translate-y-2' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;
