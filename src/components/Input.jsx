import React, { forwardRef } from 'react';

export const Input = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full bg-surface-container-highest text-on-surface rounded-lg px-4 py-3 border-none ghost-border focus:ring-0 ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';
