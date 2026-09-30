import React from 'react';
import Link from 'next/link';

export function Logo({
  size = 'md',
  showTagline = false,
  className = ''
}: {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link href="/" className={`flex items-center gap-2.5 group select-none ${className}`}>
      <div
        className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300`}
      >
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle inner grid glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/0 opacity-60" />
          
          {/* Logo geometry: Document sheet + AI Spark */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-4/5 h-4/5 text-indigo-400 group-hover:text-indigo-300 transition-colors"
          >
            {/* Document sheet */}
            <path
              d="M7 3C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V9.41421C19 8.88378 18.7893 8.3751 18.4142 8L14 3.58579C13.6249 3.21071 13.1162 3 12.5858 3H7Z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(99, 102, 241, 0.1)"
            />
            {/* Document lines */}
            <path
              d="M9 13H15M9 17H13"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            {/* AI Sparkle */}
            <path
              d="M17 3L17.8 4.7L19.5 5.5L17.8 6.3L17 8L16.2 6.3L14.5 5.5L16.2 4.7L17 3Z"
              fill="#38bdf8"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight text-white ${textSizes[size]}`}>
            AI<span className="text-indigo-400 font-extrabold">-PIRS</span>
          </span>
          <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            SaaS
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] text-slate-400 -mt-0.5 tracking-wide">
            Smart Document Intelligence
          </span>
        )}
      </div>
    </Link>
  );
}
