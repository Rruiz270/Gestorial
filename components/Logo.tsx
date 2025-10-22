import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Gestorial Logo - inspired by your original logo design */}
      <div className={`${sizeClasses[size]} rounded-lg gestorial-gradient flex items-center justify-center`}>
        <svg
          viewBox="0 0 40 40"
          className="w-3/4 h-3/4 text-white"
          fill="currentColor"
        >
          {/* Simplified G letter design */}
          <path d="M20 8C13.4 8 8 13.4 8 20s5.4 12 12 12c3.3 0 6.3-1.3 8.5-3.5L26 26c-1.4 1.4-3.3 2.2-5.3 2.2-4.1 0-7.5-3.4-7.5-7.5S16.6 13.2 20.7 13.2c2 0 3.8.8 5.1 2.1L28 13.1C25.8 10.9 23 9.5 20 9.5z"/>
          <circle cx="24" cy="16" r="1"/>
        </svg>
      </div>
      <span className={`font-bold text-gestorial-dark ${textSizeClasses[size]}`}>
        Gestorial
      </span>
    </div>
  );
};