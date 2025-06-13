import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition',
          error ? 'border-destructive' : '',
          className
        )}
        {...props}
      />
      {error && <div className="text-destructive text-xs mt-1">{error}</div>}
    </div>
  )
); 