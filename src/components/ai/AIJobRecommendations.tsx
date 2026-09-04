import React, { useState } from 'react';
import { Job, StudentProfile } from '../../types';
import { MOCK_JOBS } from '../../data/mockData';
import {
  Briefcase,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building,
  ShieldCheck,
  TrendingUp,
  Filter,
  DollarSign
} from 'lucide-react';

interface AIJobRecommendationsProps {
  student: StudentProfile;
  onApplyJob: (job: Job) => void;
}

export const AIJobRecommendations: React.FC<AIJobRecommendationsProps> = ({
  student,
  onApplyJob,
}) => {
  const [districtFilter, setDistrictFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Compute matching score and selection probability dynamically for student profile
  const scoredJobs = MOCK_JOBS.map(job => {
    const studentSkillsLower = student.skills.map(s => s.toLowerCase());
    const requiredSkillsLower = job.skillsRequired.map(s => s.toLowerCase());

    const matchedSkills = requiredSkillsLower.filter(s =>
      studentSkillsLower.some(st => st.includes(s) || s.includes(st))
    );
    const missingSkills = job.skillsRequired.filter(s =>
      !studentSkillsLower.some(st => st.includes(s.toLowerCase()) || s.toLowerCase().includes(st))
    );

    const skillMatchRatio = matchedSkills.length / Math.max(requiredSkillsLower.length, 1);
    const cgpaEligible = student.cgpa >= job.minCgpa ? 1 : 0.6;
    
    let matchingScore = Math.round((skillMatchRatio * 0.7 + cgpaEligible * 0.3) * 100);
    if (job.isFraudFlagged) matchingScore = 15;

    const selectionProbability = Math.min(96, Math.max(20, Math.round(matchingScore * 0.95)));

    return {
      ...job,
      matchingScore,
      missingSkills,
      selectionProbability,
      matchReason: `High skill alignment on ${matchedSkills.slice(0, 3).join(', ')} and CGPA (${student.cgpa} >= ${job.minCgpa})`,
    };
  });

  const filteredJobs = scoredJobs.filter(j => {
    if (districtFilter !== 'All' && j.district !== districtFilter) return false;
    if (typeFilter !== 'All' && j.category !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles className="h-6 w-6 text-yellow-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold flex items-center space-x-2">
              <span>AI Smart Job Matcher</span>
              <span className="bg-yellow-400 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                SIH1632 Engine
              </span>
            </h2>
            <p className="text-xs text-blue-200">
              Personalized recommendations for {student.name} ({student.branch})
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 text-xs">
            <Filter className="h-3.5 w-3.5 text-blue-200" />
            <span>District:</span>
            <select
              value={districtFilter}
              onChange={e => setDistrictFilter(e.target.value)}
              className="bg-transparent font-bold focus:outline-none text-white cursor-pointer"
            >
              <option value="All" className="text-slate-900">All Rajasthan</option>
              <option value="Jaipur" className="text-slate-900">Jaipur</option>
              <option value="Jodhpur" className="text-slate-900">Jodhpur</option>
              <option value="Kota" className="text-slate-900">Kota</option>
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 text-xs">
            <span>Sector:</span>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="bg-transparent font-bold focus:outline-none text-white cursor-pointer"
            >
              <option value="All" className="text-slate-900">All Sectors</option>
              <option value="Private" className="text-slate-900">Private Tech</option>
              <option value="Government" className="text-slate-900">Rajasthan Govt</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map(job => (
          <div
            key={job.id}
            className={`rounded-3xl p-6 border transition-all duration-300 relative flex flex-col justify-between ${
              job.isFraudFlagged
                ? 'bg-red-50/80 dark:bg-red-950/30 border-red-300 dark:border-red-900/60'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-indigo-500 dark:hover:border-indigo-500'
            }`}
          >
            {/* Top Match Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center shrink-0">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.company} className="h-8 w-8 object-contain rounded-lg" />
                  ) : (
                    <Building className="h-6 w-6 text-slate-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <span>{job.title}</span>
                    {job.trustScore >= 95 && (
                      <ShieldCheck className="h-4 w-4 text-blue-500 inline-block" title="Verified Govt / Corporate Employer" />
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{job.company}</p>
                </div>
              </div>

              {/* AI Match Score Badge */}
              <div className="text-right">
                <span
                  className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black shadow-xs ${
                    job.isFraudFlagged
                      ? 'bg-red-600 text-white'
                      : job.matchingScore >= 85
                      ? 'bg-emerald-500 text-white'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  <Sparkles className="h-3 w-3" />
                  <span>{job.matchingScore}% Match</span>
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Selection Prob: <span className="font-bold text-slate-700 dark:text-slate-300">{job.selectionProbability}%</span>
                </p>
              </div>
            </div>

            {/* Description & Attributes */}
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
              {job.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs mb-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                <span className="truncate">{job.location}</span>
              </div>

              <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
                <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{job.salary}</span>
              </div>
            </div>

            {/* Required vs Missing Skills */}
            <div className="space-y-2 mb-5">
              <div className="flex flex-wrap gap-1.5">
                {job.skillsRequired.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {job.missingSkills && job.missingSkills.length > 0 && !job.isFraudFlagged && (
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 flex items-center space-x-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span>
                    Missing Skills: <strong>{job.missingSkills.join(', ')}</strong> (Take AI Skill Gap Course)
                  </span>
                </div>
              )}
            </div>

            {/* Apply Action Button */}
            <button
              onClick={() => onApplyJob(job)}
              disabled={job.isFraudFlagged}
              className={`w-full py-3 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 ${
                job.isFraudFlagged
                  ? 'bg-red-200 text-red-700 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
              }`}
            >
              {job.isFraudFlagged ? (
                <span>Flagged as Suspicious</span>
              ) : (
                <>
                  <span>One-Click AI Apply</span>
                  <TrendingUp className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
