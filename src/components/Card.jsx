import React from 'react';

export const Card = ({ children, className = '', highlight = false, ...props }) => {
  const baseStyle = "p-6 overflow-hidden";
  // The 'no-line' rule: boundaries are defined through tonal shifts.
  // Highlight cards use surface-container-lowest (#ffffff), others use surface-container-low.
  // We use xl (1.5rem) roundedness for main cards
  
  const bg = highlight ? 'bg-surface-container-lowest' : 'bg-surface-container-low';
  
  // Floating elements use ambient shadow and surface-variant with blur if requested, but for standard cards we rely on tonal shift. 
  
  return (
    <div className={`${baseStyle} ${bg} rounded-xl ${highlight ? 'shadow-ambient' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
};
