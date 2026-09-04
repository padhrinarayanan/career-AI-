import React from 'react';
import { X } from 'lucide-react';
import { AIResumeAnalyzer } from './AIResumeAnalyzer';

interface AIResumeAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBadgeUnlocked?: (title: string, desc: string) => void;
}

export const AIResumeAnalyzerModal: React.FC<AIResumeAnalyzerModalProps> = ({
  isOpen,
  onClose,
  onBadgeUnlocked,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-4xl rounded-3xl bg-[#030712] border border-white/15 shadow-2xl p-6 relative my-8 text-slate-100 max-h-[90vh] overflow-y-auto scrollbar-thin">
        {/* Modal Close Button */}
        <div className="flex items-center justify-end pb-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Embedded Full Feature with File Manager Upload & Scoring */}
        <AIResumeAnalyzer onBadgeUnlocked={onBadgeUnlocked} isModal={true} />
      </div>
    </div>
  );
};
