'use client';

import React from 'react';
import Link from 'next/link';

interface InvoxaLogoProps {
  className?: string;
  showTagline?: boolean;
  accentColor?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const InvoxaLogo: React.FC<InvoxaLogoProps> = ({
  className = '',
  showTagline = false,
  accentColor = '#2563EB',
  size = 'md',
  href,
}) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 'w-10 h-10', text: 'text-2xl', sub: 'text-xs' },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Modern geometric icon: folded document with dynamic accent corner */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses.icon}`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          <rect width="40" height="40" rx="10" fill={accentColor} />
          {/* Stylized geometric letter 'I' & document fold in negative space */}
          <path
            d="M13 11C13 10.4477 13.4477 10 14 10H22L27 15V29C27 29.5523 26.5523 30 26 30H14C13.4477 30 13 29.5523 13 29V11Z"
            fill="white"
            fillOpacity="0.25"
          />
          <path
            d="M15 13C15 12.4477 15.4477 12 16 12H21.5L25 15.5V27C25 27.5523 24.5523 28 24 28H16C15.4477 28 15 27.5523 15 27V13Z"
            fill="white"
          />
          <path
            d="M21.5 12V15.5H25"
            stroke={accentColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle invoice horizontal lines */}
          <line x1="18" y1="18.5" x2="22" y2="18.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="21.5" x2="22" y2="21.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="24.5" x2="20" y2="24.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight text-slate-900 leading-none ${sizeClasses.text}`}
        >
          Invoxa
        </span>
        {showTagline && (
          <span className={`text-slate-400 font-medium tracking-wide mt-0.5 leading-none ${sizeClasses.sub}`}>
            Free Invoice Studio
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};

