import React, { useState } from 'react';
import { RoadmapWeek } from '../../types';
import { Sparkles, CheckCircle2, Circle, BookOpen, Layers, Award, Calendar } from 'lucide-react';

export const AILearningRoadmap: React.FC = () => {
  const [roadmap, setRoadmap] = useState<RoadmapWeek[]>([
    {
      weekNumber: 1,
      title: 'Foundations of Modern Web Architecture',
      topics: ['TypeScript Fundamentals', 'React Functional Components & Hooks', 'Tailwind CSS Layouts'],
      project: 'Build a Personal Developer Portfolio Website',
      certification: 'NPTEL React & Frontend Essentials',
      completed: true,
    },
    {
      weekNumber: 2,
      title: 'Backend API & Node.js Microservices',
      topics: ['Express.js REST API Design', 'MongoDB Atlas Data Modeling', 'JWT Auth & Middleware'],
      project: 'Build a Secure RESTful E-Commerce Backend API',
      certification: 'SWAYAM Node.js & Database Systems',
      completed: true,
    },
    {
      weekNumber: 3,
      title: 'AI & GenAI Integration with Gemini SDK',
      topics: ['@google/genai Server-Side SDK', 'Prompt Engineering', 'Structured JSON Output'],
      project: 'Integrate Gemini Resume Analyzer in Express server',
      certification: 'Google Cloud GenAI Foundations',
      completed: false,
    },
    {
      weekNumber: 4,
      title: 'Cloud Deployment, Docker & DevOps',
      topics: ['Docker Multi-stage Builds', 'CI/CD Pipelines with GitHub Actions', 'Cloud Run / AWS EC2'],
      project: 'Deploy Full-Stack Application to Cloud Run with HTTPS',
      certification: 'AWS Certified Cloud Practitioner',
      completed: false,
    },
  ]);

  const toggleWeek = (weekNum: number) => {
    setRoadmap(prev =>
      prev.map(w => (w.weekNumber === weekNum ? { ...w, completed: !w.completed } : w))
    );
  };

  const completedCount = roadmap.filter(w => w.completed).length;
  const progressPercent = Math.round((completedCount / roadmap.length) * 100);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
            <span>AI Week-by-Week Curriculum</span>
          </div>
          <h2 className="text-xl font-bold">Personalized AI Learning Roadmap</h2>
          <p className="text-xs text-indigo-200 mt-1">
            Curated week-by-week technical modules, hands-on projects, and NPTEL/SWAYAM certifications.
          </p>
        </div>

        {/* Progress gauge */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0">
          <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">
            Curriculum Progress
          </span>
          <div className="text-3xl font-extrabold text-white my-0.5">{progressPercent}%</div>
          <p className="text-[10px] text-indigo-200">{completedCount} of {roadmap.length} Weeks Done</p>
        </div>
      </div>

      {/* Week Nodes Timeline */}
      <div className="space-y-4 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {roadmap.map(week => (
          <div
            key={week.weekNumber}
            className={`relative pl-14 p-6 rounded-3xl border transition-all duration-200 ${
              week.completed
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md'
            }`}
          >
            {/* Circle Node */}
            <button
              onClick={() => toggleWeek(week.weekNumber)}
              className={`absolute left-3 top-6 h-7 w-7 rounded-full flex items-center justify-center transition-all ${
                week.completed
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 hover:bg-indigo-500 hover:text-white'
              }`}
            >
              {week.completed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 uppercase">
                  Week #{week.weekNumber}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">
                  {week.title}
                </h3>
              </div>

              {week.certification && (
                <div className="flex items-center space-x-1.5 text-xs text-purple-600 dark:text-purple-300 font-semibold bg-purple-50 dark:bg-purple-950/50 px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800 shrink-0">
                  <Award className="h-4 w-4 text-purple-500" />
                  <span>{week.certification}</span>
                </div>
              )}
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {week.topics.map((tp, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                >
                  {tp}
                </span>
              ))}
            </div>

            {/* Recommended Project */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
              <Layers className="h-4 w-4 text-indigo-500 shrink-0" />
              <span>
                <strong>Hands-on Project:</strong> {week.project}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
