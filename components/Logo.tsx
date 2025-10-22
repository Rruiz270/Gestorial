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
          {/* Stylized G letter with dynamic curves representing management and growth */}
          <path d="M20 5C11.716 5 5 11.716 5 20c0 8.284 6.716 15 15 15 4.142 0 7.5-3.358 7.5-7.5 0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5c0 1.381-1.119 2.5-2.5 2.5-4.142 0-7.5-3.358-7.5-7.5S15.858 12.5 20 12.5c2.071 0 3.946.842 5.303 2.197l-2.803 2.803H30V10l-2.197 2.197C25.607 10.001 22.99 8.5 20 8.5c-6.351 0-11.5 5.149-11.5 11.5S13.649 31.5 20 31.5c3.038 0 5.799-1.248 7.803-3.252C29.252 26.799 30.5 24.038 30.5 21c0-2.761-2.239-5-5-5s-5 2.239-5 5c0 .552.448 1 1 1s1-.448 1-1c0-1.657 1.343-3 3-3s3 1.343 3 3c0 2.485-1.015 4.738-2.654 6.377S22.485 29.5 20 29.5c-5.238 0-9.5-4.262-9.5-9.5S14.762 10.5 20 10.5z"/>
          {/* Additional design elements representing the consulting nature */}
          <circle cx="25" cy="15" r="1.5" opacity="0.8"/>
          <circle cx="28" cy="18" r="1" opacity="0.6"/>
          <circle cx="26" cy="21" r="0.8" opacity="0.4"/>
        </svg>
      </div>
      <span className={`font-bold text-gestorial-dark ${textSizeClasses[size]}`}>
        Gestorial
      </span>
    </div>
  );
};