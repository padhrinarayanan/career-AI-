import React, { useState } from 'react';
import { MOCK_DISTRICTS } from '../../data/mockData';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Landmark, MapPin, Sparkles, TrendingUp, Users, ShieldCheck, Award } from 'lucide-react';

export const GovtDashboard: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(MOCK_DISTRICTS[0]);

  const trends = [
    { year: '2021', placementRate: 64, avgPackage: 5.2 },
    { year: '2022', placementRate: 71, avgPackage: 6.0 },
    { year: '2023', placementRate: 79, avgPackage: 6.8 },
    { year: '2024', placementRate: 84, avgPackage: 7.5 },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-orange-950 via-slate-900 to-indigo-950 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-orange-500/20">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Landmark className="h-3.5 w-3.5 text-orange-400" />
            <span>Govt of Rajasthan • Technical Education Department</span>
          </div>
          <h1 className="text-2xl font-black">State Career & Skill Monitoring Dashboard</h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time telemetry across 33 districts, 150+ colleges, and 45,000+ technical graduates.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0">
          <span className="text-[10px] font-bold text-orange-300 uppercase tracking-wider">
            Statewide Employment Rate
          </span>
          <div className="text-3xl font-black text-white my-0.5">84.2%</div>
          <p className="text-[10px] text-emerald-400 font-bold">+5.3% YoY Growth</p>
        </div>
      </div>

      {/* District Selector Heatmap Grid */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-orange-500" />
          <span>Rajasthan District Wise Skill & Placement Matrix</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOCK_DISTRICTS.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDistrict(d)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedDistrict.id === d.id
                  ? 'bg-orange-500 text-white border-orange-400 shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-orange-500'
              }`}
            >
              <h4 className="font-bold text-sm">{d.name}</h4>
              <p className={`text-[10px] mt-1 ${selectedDistrict.id === d.id ? 'text-orange-100' : 'text-slate-400'}`}>
                Placement: {d.placementRate}%
              </p>
              <p className={`text-[10px] font-semibold ${selectedDistrict.id === d.id ? 'text-orange-100' : 'text-slate-500'}`}>
                Avg: ₹{d.avgPackageLpa} LPA
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected District Detail Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 uppercase">
              District Focus
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {selectedDistrict.name} District Telemetry
            </h3>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500">Colleges Tracked</span>
            <p className="text-lg font-bold text-indigo-600">{selectedDistrict.collegesCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-400 uppercase">Active Students</span>
            <p className="text-2xl font-black text-slate-900 dark:text-white my-1">
              {selectedDistrict.studentsCount.toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-400 uppercase">Top In-Demand Skills</span>
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedDistrict.topSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-400 uppercase">Major Industry Employers</span>
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedDistrict.majorIndustries.map((ind, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
