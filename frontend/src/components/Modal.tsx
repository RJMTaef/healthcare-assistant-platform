import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({ open, onClose, title, children, className = '' }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className={cn('bg-surface rounded-xl p-8 shadow-xl w-full max-w-md', className)}>
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        {children}
        <button
          className="mt-6 w-full bg-primary text-white py-2 rounded-xl hover:bg-primary-dark transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
} 