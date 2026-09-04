import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { DollarSign, Sparkles, TrendingUp, Award, Building, MapPin } from 'lucide-react';

interface AISalaryPredictorProps {
  student: StudentProfile;
}

export const AISalaryPredictor: React.FC<AISalaryPredictorProps> = ({ student }) => {
  const [targetLocation, setTargetLocation] = useState('Jaipur');
  const [experienceMonths, setExperienceMonths] = useState(6);

  // Compute expected salary based on parameters
  const baseSalary = 6.5;
  const cgpaBonus = (student.cgpa - 7.0) * 1.2;
  const skillsBonus = student.skills.length * 0.4;
  const locationMultiplier = targetLocation === 'Jaipur' ? 1.1 : targetLocation === 'Remote' ? 1.3 : 1.0;

  const predictedSalary = Math.round((baseSalary + Math.max(0, cgpaBonus) + skillsBonus) * locationMultiplier * 10) / 10;
  const minSalary = Math.round((predictedSalary * 0.8) * 10) / 10;
  const maxSalary = Math.round((predictedSalary * 1.3) * 10) / 10;

  const chartData = [
    { name: 'State Average', ctc: 4.5, color: '#94a3b8' },
    { name: 'Your Expected Min', ctc: minSalary, color: '#6366f1' },
    { name: 'Your AI Median', ctc: predictedSalary, color: '#10b981' },
    { name: 'Your Top Max', ctc: maxSalary, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-blue-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            <span>SIH 2024 Market Intelligence</span>
          </div>
          <h2 className="text-xl font-bold">AI Salary Predictor & CTC Estimator</h2>
          <p className="text-xs text-emerald-200 mt-1">
            Predict expected entry-level compensation across Jaipur, Jodhpur, Kota & Remote markets.
          </p>
        </div>

        {/* Big Predicted Stat */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider">
            Predicted Package
          </span>
          <div className="text-3xl font-extrabold text-white my-0.5">
            ₹{minSalary} - ₹{maxSalary} LPA
          </div>
          <p className="text-[10px] text-emerald-200">Median CTC: ₹{predictedSalary} LPA</p>
        </div>
      </div>

      {/* Controls & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Prediction Factors
          </h3>

          <div>
            <label className="block text-xs text-slate-500 mb-1">Target Work Location</label>
            <select
              value={targetLocation}
              onChange={e => setTargetLocation(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold"
            >
              <option value="Jaipur">Jaipur (SEZ Mahindra World City)</option>
              <option value="Jodhpur">Jodhpur IT Hub</option>
              <option value="Kota">Kota Industrial District</option>
              <option value="Remote">Remote / PAN India</option>
            </select>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Student College:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{student.college}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Department CGPA:</span>
              <span className="font-bold text-emerald-600">{student.cgpa} / 10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Technical Skills:</span>
              <span className="font-bold text-indigo-600">{student.skills.length} Verified</span>
            </div>
          </div>
        </div>

        {/* Recharts Bar Graph */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span>Compensation Comparison (₹ LPA)</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis unit=" LPA" tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: any) => [`₹${value} LPA`, 'Package']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="ctc" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
