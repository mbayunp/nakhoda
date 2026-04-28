import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logonakhoda.jpg';

/**
 * Reusable Logo component for consistent brand identity.
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl'
 * @param {boolean} showText - Show company name text beside logo
 * @param {string} variant - 'dark' (for light backgrounds) | 'light' (for dark backgrounds)
 * @param {boolean} linkToHome - Wrap logo in a Link to "/"
 * @param {string} className - Additional CSS classes
 */
const Logo = ({ 
  size = 'md', 
  showText = true, 
  variant = 'dark', 
  linkToHome = true, 
  className = '' 
}) => {
  const sizes = {
    sm: { img: 'h-8 w-8', name: 'text-base', sub: 'text-[8px] tracking-[0.15em]', gap: 'gap-2' },
    md: { img: 'h-10 w-10 sm:h-11 sm:w-11', name: 'text-lg sm:text-xl', sub: 'text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em]', gap: 'gap-2.5 sm:gap-3' },
    lg: { img: 'h-12 w-12 sm:h-14 sm:w-14', name: 'text-xl sm:text-2xl', sub: 'text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em]', gap: 'gap-3' },
    xl: { img: 'h-16 w-16 sm:h-20 sm:w-20', name: 'text-2xl sm:text-3xl', sub: 'text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em]', gap: 'gap-3 sm:gap-4' },
  };

  const s = sizes[size] || sizes.md;
  const isDark = variant === 'dark';

  const content = (
    <div className={`flex items-center ${s.gap} ${linkToHome ? 'group' : ''} ${className}`}>
      {/* Logo image */}
      <div className={`${s.img} rounded-xl overflow-hidden shrink-0 bg-white shadow-sm ${linkToHome ? 'transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3' : ''}`}>
        <img 
          src={logoImg} 
          alt="CV. Nakhoda Nusantara Grup" 
          className="w-full h-full object-contain"
          width={44}
          height={44}
        />
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold ${s.name} leading-none transition-colors duration-300 ${isDark ? 'text-secondary' : 'text-white'}`}>
            Nakhoda
          </span>
          <span className={`font-bold text-primary ${s.sub} uppercase`}>
            Nusantara Grup
          </span>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="relative z-50 inline-flex">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
