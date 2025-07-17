import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
};

function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseClasses =
    'px-6 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-[#1976D2] text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1976D2]',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;