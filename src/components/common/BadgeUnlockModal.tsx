import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Badge } from '../../types';
import { Award, Trophy, CheckCircle, Sparkles, X } from 'lucide-react';

interface BadgeUnlockModalProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({ badge, onClose }) => {
  useEffect(() => {
    if (badge) {
      // Fire confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
      });
    }
  }, [badge]);

  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in zoom-in-95">
      <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-amber-300/50 dark:border-amber-500/30 shadow-2xl p-6 text-center relative overflow-hidden">
        {/* Glowing background halo */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 p-0.5 shadow-xl flex items-center justify-center text-white ring-8 ring-amber-400/20 animate-bounce">
          <Trophy className="h-10 w-10 text-white" />
        </div>

        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Badge Unlocked!</span>
        </span>

        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
          {badge.title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
          {badge.description}
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition-all"
        >
          Awesome, Continue!
        </button>
      </div>
    </div>
  );
};
