import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  let style = "inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out px-6 py-3 rounded-xl cursor-pointer ";
  
  if (variant === 'primary') {
    style += "bg-vitality-gradient text-on-primary shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] hover:brightness-105 active:brightness-95";
  } else if (variant === 'secondary') {
    style += "bg-surface-container-highest text-on-surface hover:bg-surface-dim active:bg-surface-variant";
  } else if (variant === 'tertiary') {
    style += "text-secondary hover:bg-surface-container-low active:bg-surface-container-highest";
  }

  return (
    <button className={`${style} ${className}`} {...props}>
      {children}
    </button>
  );
};
