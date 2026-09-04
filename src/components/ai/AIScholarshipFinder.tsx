import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import { MOCK_SCHOLARSHIPS } from '../../data/mockData';
import { Award, Sparkles, DollarSign, Calendar, Filter, CheckCircle2 } from 'lucide-react';

interface AIScholarshipFinderProps {
  student: StudentProfile;
}

export const AIScholarshipFinder: React.FC<AIScholarshipFinderProps> = ({ student }) => {
  const [categoryFilter, setCategoryFilter] = useState('All');

  const eligibleScholarships = MOCK_SCHOLARSHIPS.filter(sch => {
    if (categoryFilter !== 'All' && !sch.category.includes(categoryFilter)) return false;
    if (sch.maxIncomeLakhs && student.annualIncome > sch.maxIncomeLakhs * 100000) return false;
    if (sch.minCgpa && student.cgpa < sch.minCgpa) return false;
    if (sch.targetGender && sch.targetGender !== student.gender) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Govt of Rajasthan Welfare</span>
          </div>
          <h2 className="text-xl font-bold">AI Scholarship & Grant Recommender</h2>
          <p className="text-xs text-amber-200 mt-1">
            Recommends Rajasthan State and Central Government scholarships based on CGPA, income, and category.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0">
          <span className="text-[10px] font-bold uppercase text-amber-200 tracking-wider">
            Eligible Schemes
          </span>
          <div className="text-3xl font-extrabold text-white my-0.5">
            {eligibleScholarships.length}
          </div>
          <p className="text-[10px] text-amber-200">Matching {student.name}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {eligibleScholarships.map(sch => (
          <div
            key={sch.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between hover:border-amber-500 transition-all"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold uppercase">
                  {sch.category}
                </span>
                <span className="text-xs font-bold text-slate-400 flex items-center space-x-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Due: {sch.deadline}</span>
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
                {sch.title}
              </h3>
              <p className="text-xs text-slate-500 mb-4">{sch.offeredBy}</p>

              <div className="p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 mb-4">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">
                  Grant Benefit
                </span>
                <p className="text-sm font-extrabold text-amber-900 dark:text-amber-200">
                  {sch.amount}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Eligibility:</strong> {sch.eligibility}
              </p>
            </div>

            <button className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all">
              Apply via Jan Aadhaar Portal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
