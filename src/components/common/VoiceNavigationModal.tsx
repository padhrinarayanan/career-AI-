import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface VoiceNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCommandRecognized: (command: string) => void;
}

export const VoiceNavigationModal: React.FC<VoiceNavigationModalProps> = ({
  isOpen,
  onClose,
  onCommandRecognized,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      return;
    }

    // Initialize Web Speech API if supported
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setTranscript('Speech recognition is not supported in this browser mode.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('Listening for command... Speak clearly (e.g., "Analyze Resume", "Show Jobs", "Predict Career")');
    };

    recognition.onresult = (event: any) => {
      let current = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        current += event.results[i][0].transcript;
      }
      setTranscript(current);

      const lower = current.toLowerCase();
      if (lower.includes('resume') || lower.includes('cv')) {
        setLastAction('Navigating to AI Resume Analyzer...');
        onCommandRecognized('resume');
      } else if (lower.includes('job') || lower.includes('work')) {
        setLastAction('Navigating to Jobs & Internships...');
        onCommandRecognized('jobs');
      } else if (lower.includes('career') || lower.includes('predict')) {
        setLastAction('Navigating to AI Career Predictor...');
        onCommandRecognized('career');
      } else if (lower.includes('interview') || lower.includes('mock')) {
        setLastAction('Opening AI Voice Interview Coach...');
        onCommandRecognized('interview');
      } else if (lower.includes('dashboard') || lower.includes('student')) {
        setLastAction('Opening Student Dashboard...');
        onCommandRecognized('dashboard');
      } else if (lower.includes('govt') || lower.includes('heatmap')) {
        setLastAction('Opening Rajasthan District Analytics...');
        onCommandRecognized('govt');
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.warn(e);
    }

    return () => {
      try {
        recognition.stop();
      } catch (e) {}
    };
  }, [isOpen, onCommandRecognized]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Mic className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Voice Command Assistant</h3>
              <p className="text-xs text-slate-500">Accessible hands-free navigation for SIH1632</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Listening Indicator */}
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div
              className={`h-24 w-24 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105 ring-8 ring-indigo-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {isListening ? <Mic className="h-10 w-10 animate-pulse" /> : <MicOff className="h-10 w-10" />}
            </div>
            {isListening && (
              <span className="absolute -bottom-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
                Listening Live
              </span>
            )}
          </div>

          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 min-h-[40px] max-w-sm">
            {transcript || 'Say "Show Jobs", "Analyze Resume", or "Interview Coach"'}
          </p>

          {lastAction && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>{lastAction}</span>
            </div>
          )}
        </div>

        {/* Quick Voice Command Hints */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Try saying:
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
              "Analyze my resume"
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
              "Predict my career"
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
              "Open mock interview"
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
              "Rajasthan heatmap"
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
