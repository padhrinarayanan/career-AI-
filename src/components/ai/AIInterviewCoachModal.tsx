import React, { useState } from 'react';
import { fetchInterviewQuestionsWithAI, evaluateInterviewAnswerWithAI } from '../../services/api';
import { InterviewQuestion, InterviewEvaluation } from '../../types';
import {
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  CheckCircle2,
  X,
  Play,
  RotateCcw,
  Award,
  Zap,
  HelpCircle
} from 'lucide-react';

interface AIInterviewCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIInterviewCoachModal: React.FC<AIInterviewCoachModalProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState('Full Stack Software Engineer');
  const [questionType, setQuestionType] = useState('Technical');
  const [questions, setQuestions] = useState<InterviewQuestion[]>([
    {
      id: 'q1',
      type: 'Technical',
      question: 'Explain how React Virtual DOM diffing algorithm optimizes rendering performance.',
      idealAnswerHints: ['Reconciliation algorithm', 'O(N) heuristics', 'Component key importance'],
    },
  ]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenAnswer, setSpokenAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);

  if (!isOpen) return null;

  const currentQ = questions[activeQuestionIdx] || questions[0];

  const handleGenerateQuestions = async () => {
    setLoading(true);
    const fetched = await fetchInterviewQuestionsWithAI(role, questionType);
    setQuestions(fetched);
    setActiveQuestionIdx(0);
    setEvaluation(null);
    setSpokenAnswer('');
    setLoading(false);
  };

  const handleMicToggle = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpokenAnswer(
        'In React, the virtual DOM is a lightweight JS representation of the real DOM. When state changes, React creates a new VDOM tree and compares it using reconciliation diffing to update only changed elements.'
      );
      return;
    }

    if (isRecording) {
      setIsRecording(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onresult = (e: any) => {
        let text = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          text += e.results[i][0].transcript;
        }
        setSpokenAnswer(text);
      };

      recognition.start();
    }
  };

  const handleEvaluateAnswer = async () => {
    if (!spokenAnswer.trim()) return;
    setLoading(true);
    const evalResult = await evaluateInterviewAnswerWithAI(role, spokenAnswer);
    setEvaluation(evalResult);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md">
              <Mic className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>AI Voice Interview Coach</span>
                <span className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Voice Enabled
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Practice Technical, HR & Behavioral questions with real-time confidence scoring
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Top Controls Bar */}
        <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase">Target Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full mt-1 p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-semibold"
            >
              <option value="Full Stack Software Engineer">Full Stack Developer</option>
              <option value="AI / ML Engineer">AI / ML Engineer</option>
              <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase">Question Category</label>
            <select
              value={questionType}
              onChange={e => setQuestionType(e.target.value)}
              className="w-full mt-1 p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-semibold"
            >
              <option value="Technical">Technical Concept</option>
              <option value="Coding">Coding / Architecture</option>
              <option value="HR">HR / General</option>
              <option value="Behavioral">Behavioral (STAR)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerateQuestions}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Generate Questions</span>
            </button>
          </div>
        </div>

        {/* Active Question Box */}
        <div className="py-6 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 uppercase tracking-wider">
              Question #{activeQuestionIdx + 1} of {questions.length} • {currentQ?.type}
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 leading-snug">
              "{currentQ?.question}"
            </h3>

            {currentQ?.idealAnswerHints && (
              <div className="mt-3 flex flex-wrap gap-1">
                {currentQ.idealAnswerHints.map((hint, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    Key Hint: {hint}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Voice Practice Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Mic className="h-4 w-4 text-purple-500" />
                <span>Your Spoken Answer</span>
              </label>

              <button
                onClick={handleMicToggle}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                }`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span>{isRecording ? 'Stop Recording' : 'Start Mic Voice Practice'}</span>
              </button>
            </div>

            <textarea
              value={spokenAnswer}
              onChange={e => setSpokenAnswer(e.target.value)}
              rows={4}
              placeholder="Click 'Start Mic Voice Practice' to speak, or type your answer here..."
              className="w-full p-4 text-xs font-sans rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex justify-end">
              <button
                onClick={handleEvaluateAnswer}
                disabled={loading || !spokenAnswer.trim()}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span>AI Interviewer Evaluating...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    <span>Get AI Feedback & Score</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Evaluation Output */}
          {evaluation && (
            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="font-bold text-sm text-purple-300 flex items-center space-x-2">
                  <Award className="h-5 w-5 text-purple-400" />
                  <span>AI Interview Feedback</span>
                </h4>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-extrabold">
                    Overall Score: {evaluation.score}/100
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-extrabold">
                    Confidence: {evaluation.confidenceScore}%
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{evaluation.detailedFeedback}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <h5 className="font-bold text-emerald-400 mb-1">Answer Strengths</h5>
                  <ul className="space-y-1 text-slate-300">
                    {evaluation.strengths.map((s, idx) => (
                      <li key={idx}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <h5 className="font-bold text-amber-400 mb-1">Growth Tips</h5>
                  <ul className="space-y-1 text-slate-300">
                    {evaluation.areasToImprove.map((tip, idx) => (
                      <li key={idx}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
