import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import { FileText, Printer, Sparkles, X, Check, Download, Zap } from 'lucide-react';

interface AIResumeBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
}

export const AIResumeBuilderModal: React.FC<AIResumeBuilderModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  const [summary, setSummary] = useState(
    `Motivated B.Tech Computer Science student at ${student.college} with strong expertise in ${student.skills.slice(0, 4).join(', ')}. Demonstrated experience in full-stack web engineering and AI integrations.`
  );

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 print:hidden">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-md">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                AI Modern Resume Builder
              </h2>
              <p className="text-xs text-slate-500">
                100% ATS-Friendly Template • One Click Print & Export PDF
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center space-x-1.5"
            >
              <Printer className="h-4 w-4" />
              <span>Export PDF / Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Resume Preview Paper */}
        <div className="my-6 p-8 bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-xl max-w-3xl mx-auto space-y-6 font-sans print:border-none print:shadow-none print:m-0 print:p-0">
          {/* Header */}
          <div className="border-b border-slate-300 pb-4 text-center">
            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
              {student.name}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              {student.email} | {student.phone} | {student.district}, Rajasthan
            </p>
            <p className="text-xs text-blue-700 font-medium mt-0.5">
              LinkedIn: {student.linkedinUrl} | GitHub: {student.githubUrl}
            </p>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
              Professional Summary
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
              Education
            </h3>
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>{student.college}</span>
              <span>2021 – 2025</span>
            </div>
            <p className="text-xs text-slate-600">
              {student.branch} — CGPA: <strong>{student.cgpa} / 10.0</strong>
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
              Technical Skills
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Core Competencies:</strong> {student.skills.join(', ')}
            </p>
          </div>

          {/* Key Projects */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
              Key Projects
            </h3>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>CareerConnect AI — Rajasthan Tech Education Portal</span>
                  <span>2024</span>
                </div>
                <p className="text-slate-600">
                  • Designed and engineered full-stack React + Express AI ecosystem for Smart India Hackathon SIH1632.<br />
                  • Implemented Gemini AI ATS scanner and real-time voice interview coach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
