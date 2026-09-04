import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is CareerConnect AI for SIH 2024 Problem Statement SIH1632?',
      a: 'CareerConnect AI is a complete AI-driven Career Development Ecosystem designed for the Technical Education Department, Government of Rajasthan. It integrates Gemini AI for ATS resume scoring, voice interview coaching, and skill gap roadmaps.',
    },
    {
      q: 'How does the AI Resume ATS Scanner evaluate resumes?',
      a: 'Our server-side Express AI engine uses Google Gemini AI to parse skills, education, projects, and calculate real ATS keywords compatibility percentage.',
    },
    {
      q: 'Are Rajasthan Government scholarships supported on this portal?',
      a: 'Yes, the AI Scholarship Finder recommends schemes like Mukhyamantri Uchcha Shiksha Chhatravriti, Post-Matric SJE, and Kalibai Bhil Medhavi Chhatra Scooty Yojana.',
    },
    {
      q: 'Can corporate recruiters verify authentic student credentials?',
      a: 'Yes, student profiles are synchronized with technical college databases and verified via Jan Aadhaar and college enrollment numbers.',
    },
  ];

  return (
    <div className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">SIH 2024 Problem Statement SIH1632 Details</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-800/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
