import React, { useState } from 'react';
import { StudentProfile, Job, Application, Badge } from '../../types';
import { MOCK_APPLICATIONS, MOCK_JOBS } from '../../data/mockData';
import {
  FileText,
  Briefcase,
  Sparkles,
  Award,
  TrendingUp,
  CheckCircle2,
  Github,
  Linkedin,
  Calendar,
  Layers,
  ChevronRight,
  Zap,
  Bookmark,
  Bell,
  UserCheck
} from 'lucide-react';

interface StudentDashboardProps {
  student: StudentProfile;
  onOpenTool: (toolName: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  onOpenTool,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'badges' | 'import'>('overview');
  const [githubUrl, setGithubUrl] = useState(student.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(student.linkedinUrl || '');
  const [imported, setImported] = useState(false);

  const handleImportProfile = () => {
    setImported(true);
    setTimeout(() => setImported(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Student Profile Hero Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-1 shadow-lg shrink-0">
              <div className="h-full w-full rounded-xl bg-slate-900 flex items-center justify-center text-xl font-black text-amber-400">
                {student.name.charAt(0)}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black">{student.name}</h1>
                <span className="bg-emerald-400 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  Verified Student
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                {student.college} • {student.branch} (Sem {student.semester})
              </p>
              <p className="text-xs text-amber-300 font-semibold mt-1">
                CGPA: {student.cgpa}/10 • District: {student.district}
              </p>
            </div>
          </div>

          {/* Quick AI Tools Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onOpenTool('resume')}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md border border-white/20 flex items-center space-x-1.5 transition-all"
            >
              <FileText className="h-4 w-4 text-blue-300" />
              <span>ATS Resume Analyzer</span>
            </button>

            <button
              onClick={() => onOpenTool('interview')}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-1.5 transition-all"
            >
              <Sparkles className="h-4 w-4 text-slate-900" />
              <span>Voice Interview Coach</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Resume ATS Score
          </span>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 my-1">
            {student.resumeScore}%
          </div>
          <p className="text-[10px] text-emerald-500 font-semibold">High Placement Readiness</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Active Applications
          </span>
          <div className="text-3xl font-black text-blue-600 my-1">
            {MOCK_APPLICATIONS.length}
          </div>
          <p className="text-[10px] text-blue-500 font-semibold">1 Interview Scheduled</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Roadmap Progress
          </span>
          <div className="text-3xl font-black text-purple-600 my-1">50%</div>
          <p className="text-[10px] text-purple-500 font-semibold">2 Weeks Completed</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Achievements
          </span>
          <div className="text-3xl font-black text-amber-500 my-1">
            {student.badges.length} Badges
          </div>
          <p className="text-[10px] text-amber-500 font-semibold">SIH 2024 Finalist</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-4 text-sm font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors ${
            activeTab === 'overview'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Overview & AI Tools
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 transition-colors ${
            activeTab === 'applications'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Active Applications ({MOCK_APPLICATIONS.length})
        </button>

        <button
          onClick={() => setActiveTab('import')}
          className={`pb-3 transition-colors ${
            activeTab === 'import'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          GitHub / LinkedIn Import
        </button>
      </div>

      {/* Overview View */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* AI Tools Launcher Grid */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Launch AI Career Development Suite</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => onOpenTool('resume')}
                id="btn-student-dashboard-resume-analyzer"
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:border-cyan-500 transition-all text-left group cursor-pointer"
              >
                <div className="h-10 w-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">AI Resume & ATS Scanner</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Upload file & get instant score</p>
              </button>

              <button
                onClick={() => onOpenTool('skillgap')}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:border-purple-500 transition-all text-left group"
              >
                <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Skill Gap Analysis</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">NPTEL & SWAYAM Courses</p>
              </button>

              <button
                onClick={() => onOpenTool('predictor')}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:border-emerald-500 transition-all text-left group"
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Career Predictor</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Role Probability %</p>
              </button>

              <button
                onClick={() => onOpenTool('interview')}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:border-amber-500 transition-all text-left group"
              >
                <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Interview Coach</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Voice Practice & Audio Feedback</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applications View */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {MOCK_APPLICATIONS.map(app => (
            <div
              key={app.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 uppercase">
                  {app.company}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {app.jobTitle}
                </h3>
                <p className="text-xs text-slate-500">Applied on {app.appliedDate}</p>
                {app.notes && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-2">
                    Note: {app.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-xs">
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Import View */}
      {activeTab === 'import' && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Github className="h-5 w-5" />
            <span>Auto-Import GitHub Repositories & LinkedIn Portfolio</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                GitHub Profile URL
              </label>
              <input
                type="text"
                value={githubUrl}
                onChange={e => setGithubUrl(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={linkedinUrl}
                onChange={e => setLinkedinUrl(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
              />
            </div>
          </div>

          <button
            onClick={handleImportProfile}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
          >
            Run Profile Import
          </button>

          {imported && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Imported 12 GitHub Repositories and LinkedIn Endorsements!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
