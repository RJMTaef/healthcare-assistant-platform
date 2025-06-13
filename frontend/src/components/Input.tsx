import type { InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-muted">{label}</label>}
      <input
        className={cn(
          'w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition',
          error && 'border-danger',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
} 