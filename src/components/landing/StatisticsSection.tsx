import React from 'react';
import { Users, Building2, TrendingUp, Award } from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  const stats = [
    { label: 'Engineering Students', value: '50,000+', change: '+12% YoY', icon: Users },
    { label: 'Technical Colleges', value: '150+', change: '33 Districts', icon: Building2 },
    { label: 'Placement Rate', value: '84.2%', change: '+5.3% Growth', icon: TrendingUp },
    { label: 'Highest Package', value: '₹32.0 LPA', change: 'Metacube & Amazon', icon: Award },
  ];

  return (
    <div className="py-12 border-y border-white/10 relative z-10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                    {st.change}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white mt-3">
                  {st.value}
                </div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">{st.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

