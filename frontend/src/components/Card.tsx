import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  shadow?: boolean;
}

export default function Card({ children, className = '', shadow = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface rounded-xl p-6',
        shadow && 'shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
} 