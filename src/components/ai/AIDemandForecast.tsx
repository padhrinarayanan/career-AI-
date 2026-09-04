import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Sparkles, Award, Cpu, Globe } from 'lucide-react';

export const AIDemandForecast: React.FC = () => {
  const demandData = [
    { year: '2022', aiMl: 35, fullStack: 65, cloudDevops: 40, cyberSec: 25 },
    { year: '2023', aiMl: 52, fullStack: 78, cloudDevops: 55, cyberSec: 38 },
    { year: '2024', aiMl: 84, fullStack: 92, cloudDevops: 72, cyberSec: 58 },
    { year: '2025 (P)', aiMl: 120, fullStack: 110, cloudDevops: 95, cyberSec: 82 },
    { year: '2026 (P)', aiMl: 165, fullStack: 125, cloudDevops: 120, cyberSec: 105 },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5 text-blue-300" />
            <span>Rajasthan Industry Intelligence</span>
          </div>
          <h2 className="text-xl font-bold">AI Skill Demand Forecast & Hiring Trends</h2>
          <p className="text-xs text-blue-200 mt-1">
            Predicts top emerging technologies and hiring velocity in Jaipur SEZ & Jodhpur IT hubs.
          </p>
        </div>
      </div>

      {/* Chart Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-indigo-500" />
          <span>Technical Skill Hiring Demand Growth Index (2022 - 2026)</span>
        </h3>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={demandData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCloud" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Area type="monotone" dataKey="aiMl" name="AI / GenAI Engineering" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorAi)" />
              <Area type="monotone" dataKey="fullStack" name="Full Stack React/Node" stroke="#3b82f6" fillOpacity={1} fill="url(#colorFs)" />
              <Area type="monotone" dataKey="cloudDevops" name="Cloud & Kubernetes" stroke="#10b981" fillOpacity={1} fill="url(#colorCloud)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
