import React, { useState } from 'react';
import { predictCareerPathWithAI } from '../../services/api';
import { CareerPredictionResult, StudentProfile } from '../../types';
import {
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  ChevronRight,
  Zap,
  Target
} from 'lucide-react';

interface AICareerPredictorProps {
  student: StudentProfile;
}

export const AICareerPredictor: React.FC<AICareerPredictorProps> = ({ student }) => {
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<CareerPredictionResult[] | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    const res = await predictCareerPathWithAI(
      student.branch,
      student.cgpa,
      student.skills,
      'Full Stack Web Development, GenAI, Cloud Computing'
    );
    setPredictions(res);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5 text-blue-300" />
            <span>SIH 2024 Predictive Model</span>
          </div>
          <h2 className="text-xl font-bold">AI Career & Role Predictor</h2>
          <p className="text-xs text-blue-200 mt-1">
            Predicts Software Engineer, ML Engineer, Cyber Security, Cloud, Data Scientist roles with confidence %
          </p>
        </div>

        <button
          onClick={handlePredict}
          disabled={loading}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center space-x-2 transition-all shrink-0"
        >
          {loading ? (
            <>
              <Sparkles className="h-4 w-4 animate-spin" />
              <span>Analyzing Profile...</span>
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              <span>Predict My Best Roles</span>
            </>
          )}
        </button>
      </div>

      {/* Predictions Output */}
      {predictions ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
          {predictions.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between hover:border-indigo-500 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400">Rank #{idx + 1}</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-extrabold flex items-center space-x-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{p.confidence}% Confidence</span>
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                  {p.role}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {p.description}
                </p>

                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                      Key Strengths Match
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {p.keyStrengths.map((str, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-medium"
                        >
                          {str}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                      Target Growth Areas
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {p.skillGaps.map((gap, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[10px] font-medium"
                        >
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Target className="h-12 w-12 text-indigo-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Click "Predict My Best Roles" above
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Our SIH 2024 predictive model will evaluate your CGPA, branch, and technical project history.
          </p>
        </div>
      )}
    </div>
  );
};
