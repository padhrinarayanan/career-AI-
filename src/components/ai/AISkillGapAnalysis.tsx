import React, { useState } from 'react';
import { analyzeSkillGapWithAI } from '../../services/api';
import { SkillGapAnalysisResult, StudentProfile } from '../../types';
import {
  Sparkles,
  BookOpen,
  Clock,
  Layers,
  ExternalLink,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface AISkillGapAnalysisProps {
  student: StudentProfile;
}

export const AISkillGapAnalysis: React.FC<AISkillGapAnalysisProps> = ({ student }) => {
  const [targetJd, setTargetJd] = useState(
    'Senior Full Stack Engineer with expertise in React, Node.js, Docker, Kubernetes, AWS Cloud Services, and Microservice Architecture.'
  );

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkillGapAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    const res = await analyzeSkillGapWithAI(student.skills, targetJd);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5 text-purple-300" />
            <span>SIH 2024 Skill Alignment</span>
          </div>
          <h2 className="text-xl font-bold">AI Skill Gap & Course Recommender</h2>
          <p className="text-xs text-purple-200 mt-1 max-w-xl">
            Compare your student profile against any target Job Description to generate personalized NPTEL & SWAYAM learning roadmaps.
          </p>
        </div>
      </div>

      {/* Target JD Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Target Job Description / Industry Requirements
        </label>
        <textarea
          value={targetJd}
          onChange={e => setTargetJd(e.target.value)}
          rows={4}
          className="w-full p-4 text-xs font-sans rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Paste job description text here..."
        />

        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading || !targetJd.trim()}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center space-x-2 transition-all"
          >
            {loading ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>Computing Skill Gaps...</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                <span>Analyze Skill Gap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-in fade-in">
          {/* Missing Priority Skills */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Identified Skill Gaps & Estimated Hours</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.missingSkills.map((gap, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {gap.skill}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                        gap.priority === 'High'
                          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {gap.priority} Priority
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Est. {gap.estimatedHours} Hours of Learning</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Government & Free Courses */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              <span>Recommended NPTEL, SWAYAM & Free Certifications</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.recommendedCourses.map((course, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 uppercase">
                      {course.provider}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-2 mb-1">
                      {course.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">Duration: {course.duration}</p>
                  </div>

                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 py-2 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold text-xs flex items-center justify-between hover:bg-indigo-100 transition-colors"
                  >
                    <span>Start Free Course</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
