import { useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={cn(
        'fixed top-6 right-6 z-50 rounded-lg px-6 py-4 shadow-lg text-white transition-all',
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      )}
      role="alert"
    >
      {message}
    </div>
  );
} 