"use client"; // This component has an onClick, so it's a client component

import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset'; // Added type prop
  disabled?: boolean; // Added disabled prop
};

const Button = ({ children, variant = 'primary', className = '', disabled = false, ...props }: ButtonProps) => {
  const baseClasses =
    'px-6 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1976D2]',
  };

  // Add disabled styles
  const disabledClasses = 'disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;