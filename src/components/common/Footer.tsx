import React from 'react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-lg text-white">CareerConnect AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Official AI-Driven Career Development Ecosystem for the Technical Education Department, Government of Rajasthan.
          </p>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/80 text-[11px]">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            <span>SIH 2024 Problem Statement SIH1632</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Core Portals</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><a href="#students" className="hover:text-blue-400 transition-colors">Student Placement Hub</a></li>
            <li><a href="#recruiters" className="hover:text-blue-400 transition-colors">Verified Recruiter Desk</a></li>
            <li><a href="#tpo" className="hover:text-blue-400 transition-colors">College Placement Officers (TPO)</a></li>
            <li><a href="#govt" className="hover:text-blue-400 transition-colors">Rajasthan Govt District Analytics</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">AI Technologies</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><span>Gemini 3.6 Flash Server Architecture</span></li>
            <li><span>ATS Resume Parser & Scoring Engine</span></li>
            <li><span>Realtime Mock Interview Voice Coach</span></li>
            <li><span>Rajasthan Skill Gap & Heatmap Model</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Government Contact</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Technical Education Department<br />
            W-6, Residency Road, Jodhpur, Rajasthan 342011<br />
            Helpline: 1800-180-6127 | Email: dte-raj@rajasthan.gov.in
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2024 - 2026 CareerConnect AI. Technical Education Department, Govt of Rajasthan.</p>
        <p className="flex items-center space-x-1 mt-2 md:mt-0">
          <span>Crafted with</span>
          <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
          <span>for Smart India Hackathon 2024 (SIH1632)</span>
        </p>
      </div>
    </footer>
  );
};
