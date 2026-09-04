import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const SuccessStories: React.FC = () => {
  const stories = [
    {
      name: 'Aarav Sharma',
      college: 'MBM University, Jodhpur',
      role: 'Placed as Full Stack Developer at Metacube (₹12 LPA)',
      quote:
        'The Voice AI Interview Coach helped me practice technical questions with instant feedback. The ATS Resume Analyzer improved my score from 62% to 92%!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Priya Rathore',
      college: 'RTU Kota',
      role: 'Placed as Cloud Engineer at Infosys SEZ (₹8.5 LPA)',
      quote:
        'The Skill Gap Analysis recommended two SWAYAM & NPTEL cloud courses that gave me a competitive edge during on-campus placement drives.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Rajasthan Student Success Stories
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Real engineering graduates who secured dream roles using CareerConnect AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {stories.map((st, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative"
            >
              <Quote className="h-8 w-8 text-indigo-200 dark:text-indigo-900 absolute top-6 right-6" />

              <div className="flex items-center space-x-3 mb-4">
                <img src={st.avatar} alt={st.name} className="h-12 w-12 rounded-2xl object-cover shadow-sm" />
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-1">
                    <span>{st.name}</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{st.role}</p>
                  <p className="text-[11px] text-slate-400">{st.college}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{st.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
