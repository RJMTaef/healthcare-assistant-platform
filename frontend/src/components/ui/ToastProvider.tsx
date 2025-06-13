import { createContext, useCallback, useContext, useState } from 'react';
import { Toast } from './Toast';
import type { ToastProps } from './Toast';

interface ToastContextType {
  showToast: (message: string, type?: ToastProps['type'], duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<(ToastProps & { key: number }) | null>(null);
  const showToast = useCallback((message: string, type: ToastProps['type'] = 'success', duration = 3000) => {
    setToast({ message, type, duration, onClose: () => setToast(null), key: Date.now() });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast {...toast} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
} 