import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const variants = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    filled: 'bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500',
    outlined: 'border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
  };

  const baseClasses = 'block w-full rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';
  const errorClasses = 'border-red-300 focus:border-red-500 focus:ring-red-500';

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{leftIcon}</span>
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            baseClasses,
            variants[variant],
            error ? errorClasses : '',
            leftIcon ? 'pl-10' : '',
            rightIcon ? 'pr-10' : '',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{rightIcon}</span>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}; 