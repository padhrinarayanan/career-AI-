import React, { useEffect } from 'react';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-24 right-6 z-50 flex items-center space-x-3 px-5 py-3.5 rounded-2xl bg-slate-900 text-white border border-indigo-500/30 shadow-2xl animate-in slide-in-from-top-4 duration-200">
      <div className="p-1.5 rounded-xl bg-indigo-600 text-white shrink-0">
        <Sparkles className="h-4 w-4" />
      </div>
      <p className="text-xs font-bold text-slate-100">{message}</p>
      <button
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
