import React from 'react';

export const ProgressRing = ({ percentage, size = 120, strokeWidth = 8, label = "" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-surface-container-highest fill-none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="fill-none transition-stroke duration-500 ease-in-out"
          style={{ stroke: 'url(#vitalityGradient)' }}
        />
        <defs>
          <linearGradient id="vitalityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#006d37" />
            <stop offset="100%" stopColor="#4bca78" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-display font-medium text-2xl text-on-surface">{Math.round(percentage)}%</span>
        {label && <span className="font-sans text-xs text-on-surface uppercase opacity-70 mt-1">{label}</span>}
      </div>
    </div>
  );
};
