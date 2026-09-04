import React, { useState } from 'react';
import { MOCK_JOBS } from '../../data/mockData';
import { ShieldAlert, Users, Database, Zap, CheckCircle2, Lock, Sparkles } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [jobs, setJobs] = useState(MOCK_JOBS);

  const flaggedJobs = jobs.filter(j => j.isFraudFlagged);

  const handleResolveFraud = (jobId: string) => {
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, isFraudFlagged: false, trustScore: 90 } : j))
    );
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-purple-500/20">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Lock className="h-3.5 w-3.5 text-purple-400" />
            <span>Master System Control • SIH 2024 Administration</span>
          </div>
          <h1 className="text-2xl font-black">CareerConnect AI Master Admin</h1>
          <p className="text-xs text-slate-300 mt-1">
            System health, AI Fraud Detection queue, and RBAC security monitoring.
          </p>
        </div>
      </div>

      {/* AI Fraud Detection Queue */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <span>AI Fraud & Fake Job Posting Detection Queue</span>
          </h3>
          <span className="text-xs bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 font-bold px-2.5 py-1 rounded-full">
            {flaggedJobs.length} Suspicious Items Flagged
          </span>
        </div>

        {flaggedJobs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            No active fraud alerts. All recruiter postings pass trust verification!
          </div>
        ) : (
          <div className="space-y-3">
            {flaggedJobs.map(job => (
              <div
                key={job.id}
                className="p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-red-900 dark:text-red-200">
                      {job.title} — {job.company}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px]">
                      Trust Score: {job.trustScore}%
                    </span>
                  </div>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                    AI Reason: Upfront registration fee requested or non-verified domain.
                  </p>
                </div>

                <button
                  onClick={() => handleResolveFraud(job.id)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md hover:bg-slate-800"
                >
                  Approve / Mark Verified
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
