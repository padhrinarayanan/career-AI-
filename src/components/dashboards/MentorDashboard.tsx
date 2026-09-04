import React, { useState } from 'react';
import { MOCK_MENTORS } from '../../data/mockData';
import { Award, Calendar, MessageSquare, Star, CheckCircle2, UserCheck } from 'lucide-react';

export const MentorDashboard: React.FC = () => {
  const [booked, setBooked] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="h-3.5 w-3.5 text-teal-300" />
            <span>Alumni & Industry Mentorship Network</span>
          </div>
          <h1 className="text-2xl font-black">AI Career Mentorship & Booking Portal</h1>
          <p className="text-xs text-teal-200 mt-1">
            Book 1-on-1 mock interviews, career guidance, and resume review sessions with top engineers.
          </p>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_MENTORS.map(m => (
          <div
            key={m.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between hover:border-teal-500 transition-all"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-base shadow-sm">
                  {m.mentorName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-1">
                    <span>{m.mentorName}</span>
                    <CheckCircle2 className="h-4 w-4 text-teal-500" />
                  </h3>
                  <p className="text-xs text-slate-500">{m.mentorRole} @ {m.company}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs mb-3">
                <span className="flex items-center text-amber-500 font-bold">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                  {m.rating} Rating
                </span>
                <span className="text-teal-600 dark:text-teal-400 font-bold">• {m.price}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {m.expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[10px] font-bold"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setBooked(m.mentorName)}
              className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Book 1-on-1 Session ({m.availableTime})
            </button>
          </div>
        ))}
      </div>

      {booked && (
        <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 text-xs font-bold flex items-center justify-between">
          <span>
            Session requested with <strong>{booked}</strong>! Confirmation sent to your email.
          </span>
          <button onClick={() => setBooked(null)} className="underline">
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
