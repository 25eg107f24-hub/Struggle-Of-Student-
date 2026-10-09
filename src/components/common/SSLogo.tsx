import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SSLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showSubtitle?: boolean;
  clickable?: boolean;
  imageOnly?: boolean;
}

export const SSLogo: React.FC<SSLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  clickable = true,
  imageOnly = false,
}) => {
  const imageDimensions = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
    xl: 'w-20 h-20 rounded-2xl',
    '2xl': 'w-28 h-28 rounded-3xl',
  };

  const titleSizes = {
    sm: 'text-sm font-bold',
    md: 'text-lg font-extrabold',
    lg: 'text-2xl font-black',
    xl: 'text-3xl font-black',
    '2xl': 'text-4xl font-black',
  };

  const logoImage = (
    <div
      className={`${imageDimensions[size]} relative flex-shrink-0 overflow-hidden shadow-md shadow-slate-900/10 border border-slate-200/80 bg-black group-hover:scale-105 group-hover:shadow-lg transition-all duration-300`}
    >
      <img
        src="/ss-logo.jpg"
        alt="Struggle of Students (SS) Official Logo"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );

  if (imageOnly) {
    if (clickable) {
      return (
        <Link href="/" className="inline-block group" title="Struggle of Students">
          {logoImage}
        </Link>
      );
    }
    return logoImage;
  }

  const content = (
    <div className="flex items-center gap-3 group select-none">
      {/* Official SS Logo Emblem */}
      {logoImage}

      {/* Brand Text */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-tight">
          <span className={`${titleSizes[size]} tracking-tight text-slate-900`}>
            Struggle of{' '}
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent">
              Students
            </span>
          </span>
          <span className="px-1.5 py-0.5 text-[10px] font-black rounded-md bg-red-50 text-red-600 border border-red-200 tracking-wider">
            SS
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-normal mt-0.5 uppercase hidden sm:block">
            Your Talent • Your Skills • Your Opportunity
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link href="/" title="Struggle of Students Home">
        {content}
      </Link>
    );
  }

  return content;
};

export default SSLogo;
