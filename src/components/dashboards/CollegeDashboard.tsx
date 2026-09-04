import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Building2, Award, Printer, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

export const CollegeDashboard: React.FC = () => {
  const deptData = [
    { dept: 'Computer Science', placed: 94, total: 100, avgLpa: 8.5 },
    { dept: 'Info Technology', placed: 88, total: 95, avgLpa: 7.8 },
    { dept: 'Electronics & Comm', placed: 76, total: 90, avgLpa: 6.9 },
    { dept: 'Electrical Eng', placed: 68, total: 85, avgLpa: 6.2 },
    { dept: 'Mechanical Eng', placed: 62, total: 80, avgLpa: 5.8 },
  ];

  const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="h-3.5 w-3.5 text-blue-300" />
            <span>MBM University, Jodhpur • Training & Placement Cell</span>
          </div>
          <h1 className="text-2xl font-black">College Placement Officer (TPO) Portal</h1>
          <p className="text-xs text-blue-200 mt-1">
            Department-wise placement statistics, recruiter drives, and student progress reports.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-bold text-xs shadow-xl flex items-center justify-center space-x-2 transition-all shrink-0 print:hidden"
        >
          <Printer className="h-4 w-4" />
          <span>Generate Official TPO Report (PDF)</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Overall Placement Rate</span>
          <div className="text-3xl font-black text-emerald-500 my-1">82.4%</div>
          <p className="text-[10px] text-emerald-600 font-semibold">+6.2% vs 2023</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Average CTC</span>
          <div className="text-3xl font-black text-indigo-600 my-1">₹7.2 LPA</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Highest Package</span>
          <div className="text-3xl font-black text-purple-600 my-1">₹32.0 LPA</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Visiting Companies</span>
          <div className="text-3xl font-black text-blue-600 my-1">42 Companies</div>
        </div>
      </div>

      {/* Department Analytics Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-indigo-500" />
          <span>Department-wise Placement Success Rate & Average Package</span>
        </h3>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
              <YAxis unit="%" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Bar dataKey="placed" name="Placed %" radius={[8, 8, 0, 0]}>
                {deptData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
