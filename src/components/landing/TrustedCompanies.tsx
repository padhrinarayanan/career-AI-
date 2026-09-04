import React from 'react';
import { Building, ShieldCheck } from 'lucide-react';

export const TrustedCompanies: React.FC = () => {
  const companies = [
    'Metacube Software',
    'Infosys',
    'TCS',
    'Wipro',
    'Appirio (Wipro)',
    'Genpact Jaipur',
    'Persistent Systems',
    'Rajasthan State IT Dept',
  ];

  return (
    <div className="py-12 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center justify-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Top Hiring Partners & Corporate Employers in Rajasthan</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
          {companies.map((c, i) => (
            <div
              key={i}
              className="px-5 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-sm font-bold tracking-wide hover:opacity-100 hover:border-indigo-500 transition-all cursor-default"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
