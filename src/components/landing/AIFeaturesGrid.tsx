import React from 'react';
import {
  FileText,
  Briefcase,
  Sparkles,
  Award,
  TrendingUp,
  Layers,
  BookOpen,
  Mic,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  FolderOpen
} from 'lucide-react';

interface AIFeaturesGridProps {
  onOpenTool: (toolName: string) => void;
}

export const AIFeaturesGrid: React.FC<AIFeaturesGridProps> = ({ onOpenTool }) => {
  const features = [
    {
      id: 'resume',
      title: 'AI Resume Analyzer & ATS Scanner',
      desc: 'Instant Gemini AI scoring, grammar review, ATS keyword optimization & PDF export.',
      icon: FileText,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Gemini 2.5',
    },
    {
      id: 'interview',
      title: 'Voice Interview Coach',
      desc: 'Live audio recorder with speech-to-text practice, confidence analysis, and instant scoring.',
      icon: Mic,
      color: 'from-purple-600 to-indigo-600',
      badge: 'Voice AI',
    },
    {
      id: 'skillgap',
      title: 'Skill Gap & SWAYAM Recommender',
      desc: 'Compare profile against job descriptions to extract missing skills & free courses.',
      icon: Layers,
      color: 'from-indigo-600 to-blue-600',
      badge: 'NPTEL / SWAYAM',
    },
    {
      id: 'predictor',
      title: 'AI Career Role Predictor',
      desc: 'Evaluates CGPA and skills to predict Software Engineer, ML, Data Science fit.',
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-600',
      badge: 'ML Engine',
    },
    {
      id: 'salary',
      title: 'Salary & CTC Estimator',
      desc: 'Predicts expected package across Jaipur, Jodhpur, Kota & PAN India markets.',
      icon: DollarSign,
      color: 'from-amber-600 to-orange-600',
      badge: 'Recharts Intelligence',
    },
    {
      id: 'scholarship',
      title: 'Rajasthan Scholarship Finder',
      desc: 'Recommends Govt of Rajasthan grants, Mukhyamantri Uchcha Shiksha schemes.',
      icon: Award,
      color: 'from-red-600 to-pink-600',
      badge: 'Jan Aadhaar Sync',
    },
  ];

  return (
    <div className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Complete AI Career Suite</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            15 Intelligent AI Modules Designed for SIH 2024
          </h2>
          <p className="text-sm text-slate-400 mt-4 font-medium">
            Click any module below to launch the live interactive AI simulator!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(f => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                onClick={() => onOpenTool(f.id)}
                className="group rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-6 flex flex-col justify-between gap-6 relative overflow-hidden hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-cyan-300 px-3 py-1 rounded-full">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mt-2 font-medium">
                    {f.desc}
                  </p>
                </div>

                {f.id === 'resume' ? (
                  <div className="space-y-2 mt-2" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => onOpenTool('resume')}
                      id="btn-card-upload-file-manager"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-98"
                    >
                      <FolderOpen className="h-4 w-4 text-slate-950" />
                      <span>Upload from File Manager</span>
                    </button>
                    <button
                      onClick={() => onOpenTool('resume')}
                      className="w-full py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Launch ATS Scanner</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <span>Launch Module Simulator</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
