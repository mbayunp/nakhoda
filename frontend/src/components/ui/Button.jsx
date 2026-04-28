import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  to, 
  href, 
  className = '', 
  onClick,
  isLoading = false,
  disabled,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-primary/20 focus:ring-offset-2";
  
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "border-2 border-secondary text-secondary hover:bg-primary hover:text-secondary hover:border-primary hover:scale-105 active:scale-95",
    ghost: "text-gray-600 hover:text-primary-dark hover:bg-primary-light/30 hover:scale-105 active:scale-95",
    white: "bg-white text-secondary shadow-md hover:shadow-lg hover:scale-105 active:scale-95",
  };

  const sizes = {
    sm: "px-4 sm:px-5 py-2.5 text-sm gap-2 min-h-[44px]",
    md: "px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base gap-2 min-h-[48px]",
    lg: "px-6 sm:px-9 py-3.5 sm:py-4 text-base sm:text-lg gap-2 sm:gap-3 min-h-[52px]",
  };

  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size]} ${(disabled || isLoading) ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  if (to && !disabled && !isLoading) {
    return <Link to={to} className={classes} {...props}>{children}</Link>;
  }

  if (href && !disabled && !isLoading) {
    return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  }

  return (
    <button 
      className={classes} 
      onClick={onClick} 
      disabled={disabled || isLoading} 
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
