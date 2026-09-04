import React, { useState } from 'react';
import { UserRole } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Building,
  Briefcase
} from 'lucide-react';

interface HeroSectionProps {
  onRoleSelect: (role: UserRole) => void;
  onOpenTool: (toolName: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRoleSelect, onOpenTool }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const quickPrompts = [
    'Analyze my Resume for Jaipur IT jobs',
    'Rajasthan Govt Scholarships 2024',
    'Voice Mock Interview for Software Engineer',
    'Top Tech Skills in Jodhpur SEZ',
  ];

  return (
    <div className="relative pt-24 pb-16 overflow-hidden">
      {/* Decorative Blob Glows */}
      <div className="absolute top-[20%] left-[40%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* SIH Header Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-8 shadow-md">
          <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span>SIH-1632 Technical Education Ecosystem</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">Govt of Rajasthan</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6">
          India's Future <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-300">
            Workforce Is AI-Driven
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          The unified career development platform for the Department of Technical Education, Rajasthan. Empowering 50,000+ engineering students, 150+ colleges, and verified corporate recruiters.
        </p>

        {/* AI Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <div className="relative flex items-center rounded-2xl bg-slate-900/60 backdrop-blur-2xl border border-white/15 shadow-2xl p-2">
            <Search className="h-5 w-5 text-cyan-400 ml-4 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Ask CareerBot AI anything or search jobs in Rajasthan..."
              className="w-full px-4 py-3 text-sm bg-transparent text-white focus:outline-none placeholder:text-slate-400 font-medium"
            />
            <button
              onClick={() => onOpenTool('resume')}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/20 flex items-center space-x-1.5 shrink-0 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch AI Suite</span>
            </button>
          </div>

          {/* Prompt Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-slate-500 font-medium uppercase text-[11px] tracking-wider">Try Prompts:</span>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => onOpenTool('resume')}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-medium transition-all"
              >
                {qp}
              </button>
            ))}
          </div>
        </div>

        {/* Role Portal Selectors */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onRoleSelect('student')}
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>Enter Student Portal</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            onClick={() => onRoleSelect('recruiter')}
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-white/10 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>Recruiter Desk</span>
            <Briefcase className="h-4 w-4 text-cyan-400" />
          </button>

          <button
            onClick={() => onRoleSelect('govt')}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl border border-indigo-500/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 shadow-xl"
          >
            <span>Govt Officer Telemetry</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

