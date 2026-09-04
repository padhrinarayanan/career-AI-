import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="py-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Mail className="h-10 w-10 text-amber-400 mx-auto mb-3" />
        <h2 className="text-2xl sm:text-3xl font-black">
          Subscribe to Rajasthan Placement & Scholarship Alerts
        </h2>
        <p className="text-xs text-blue-200 mt-2 max-w-xl mx-auto">
          Get real-time notification alerts whenever new corporate drives or Govt of Rajasthan grants open up.
        </p>

        {subscribed ? (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-xs inline-flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Thank you! You are now subscribed to SIH 2024 Career Alerts.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your student email..."
              className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-blue-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs shadow-lg shrink-0 transition-all"
            >
              Subscribe Free
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
