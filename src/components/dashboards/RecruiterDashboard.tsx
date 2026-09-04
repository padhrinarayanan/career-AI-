import React, { useState } from 'react';
import { MOCK_APPLICATIONS, MOCK_JOBS } from '../../data/mockData';
import { Job } from '../../types';
import {
  Briefcase,
  Plus,
  Users,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building,
  Search,
  Filter,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const RecruiterDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobSalary, setNewJobSalary] = useState('₹8.0 - ₹12 LPA');
  const [generatingAi, setGeneratingAi] = useState(false);

  const handleGenerateAiJd = () => {
    setGeneratingAi(true);
    setTimeout(() => {
      setNewJobDesc(
        `We are seeking a high-caliber Software Engineer to join our tech hub in Jaipur, Rajasthan. Responsibilities include building scalable React + TypeScript frontends and Node.js REST microservices. Required skills: React.js, Node.js, TypeScript, SQL, Docker.`
      );
      setGeneratingAi(false);
    }, 1000);
  };

  const handlePostJob = () => {
    if (!newJobTitle.trim()) return;
    const created: Job = {
      id: `job_${Date.now()}`,
      title: newJobTitle,
      company: 'Metacube Software',
      location: 'Jaipur, Rajasthan',
      type: 'Full-time',
      salary: newJobSalary,
      numericMinSalary: 8.0,
      numericMaxSalary: 12.0,
      skillsRequired: ['React.js', 'Node.js', 'TypeScript', 'SQL'],
      minCgpa: 7.5,
      allowedBranches: ['Computer Science', 'IT'],
      description: newJobDesc,
      postedDate: new Date().toISOString().split('T')[0],
      deadline: '2024-09-30',
      applicantsCount: 0,
      trustScore: 98,
      isFraudFlagged: false,
      category: 'Private',
      district: 'Jaipur'
    };

    setJobs([created, ...jobs]);
    setShowPostModal(false);
    setNewJobTitle('');
    setNewJobDesc('');
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-300" />
            <span>Verified Campus Recruiter • Jaipur SEZ</span>
          </div>
          <h1 className="text-2xl font-black">Metacube Software Recruiter Desk</h1>
          <p className="text-xs text-slate-300 mt-1">
            Access Rajasthan Technical Education Dept talent pool across 150+ govt & private engineering colleges.
          </p>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-xl shadow-indigo-500/20 flex items-center justify-center space-x-2 transition-all shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Post New Job / Internship</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Postings</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white my-1">{jobs.length}</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Applicants</span>
          <div className="text-3xl font-black text-indigo-600 my-1">452</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase">AI Ranked Candidates</span>
          <div className="text-3xl font-black text-emerald-500 my-1">100%</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Interviews Scheduled</span>
          <div className="text-3xl font-black text-purple-600 my-1">14</div>
        </div>
      </div>

      {/* AI Ranked Candidates Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            <span>AI Candidate Ranking Engine (Top Candidates for Rajasthan Jobs)</span>
          </h3>
          <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold px-2.5 py-1 rounded-full">
            Ranked by ATS Match & CGPA
          </span>
        </div>

        <div className="space-y-3">
          {MOCK_APPLICATIONS.map((app, idx) => (
            <div
              key={app.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                  #{idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {app.studentName}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {app.college} • {app.branch} (CGPA {app.cgpa})
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {app.matchScore}% AI Match
                  </span>
                  <p className="text-[10px] text-slate-400">{app.jobTitle}</p>
                </div>

                <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm">
                  Schedule Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Post New Job Opportunity
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={newJobTitle}
                onChange={e => setNewJobTitle(e.target.value)}
                placeholder="e.g. Senior Full Stack React Engineer"
                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Job Description
                </label>
                <button
                  onClick={handleGenerateAiJd}
                  disabled={generatingAi}
                  className="text-[11px] font-bold text-indigo-600 flex items-center space-x-1"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>AI Auto-Generate JD</span>
                </button>
              </div>
              <textarea
                value={newJobDesc}
                onChange={e => setNewJobDesc(e.target.value)}
                rows={4}
                placeholder="Job responsibilities and required skills..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowPostModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handlePostJob}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
              >
                Publish Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
