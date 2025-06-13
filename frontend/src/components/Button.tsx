import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  icon,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-5 py-2 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2';
  const variants: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-accent text-white hover:bg-accent-dark',
    danger: 'bg-danger text-white hover:bg-danger/90',
    outline: 'border border-primary text-primary bg-transparent hover:bg-primary-light hover:text-white',
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
} 