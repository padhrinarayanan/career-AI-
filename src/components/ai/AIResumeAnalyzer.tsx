import React, { useState, useRef } from 'react';
import { analyzeResumeWithAI, ResumeFileInfo } from '../../services/api';
import { AIResumeAnalysis } from '../../types';
import confetti from 'canvas-confetti';
import {
  FileText,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Download,
  Zap,
  Award,
  FolderOpen,
  FileCheck,
  Check,
  RefreshCw,
  Eye,
  Trash2,
  TrendingUp,
  FileCode,
  ShieldCheck,
  Search,
  ArrowRight
} from 'lucide-react';

interface AIResumeAnalyzerProps {
  onBadgeUnlocked?: (title: string, desc: string) => void;
  isModal?: boolean;
}

export const AIResumeAnalyzer: React.FC<AIResumeAnalyzerProps> = ({
  onBadgeUnlocked,
  isModal = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    file: File;
    name: string;
    size: string;
    type: string;
    base64?: string;
  } | null>(null);

  const [resumeText, setResumeText] = useState(`Aarav Sharma
aarav.sharma@mbm.ac.in | +91 98290 12345 | Jodhpur, Rajasthan
LinkedIn: linkedin.com/in/aarav-sharma-rajasthan | GitHub: github.com/aarav-sharma-tech

EDUCATION
MBM University, Jodhpur, Rajasthan — B.Tech in Computer Science Engineering (CGPA: 8.7/10) | 2021 – 2025

TECHNICAL SKILLS
Languages: JavaScript (ES6+), TypeScript, Python, C++, HTML5, CSS3, SQL
Frameworks: React.js, Node.js, Express.js, Tailwind CSS, REST APIs
Databases: MongoDB, PostgreSQL, Firebase
Tools: Git, GitHub, Postman, Linux CLI, Docker, VS Code

PROJECTS
1. CareerConnect AI - AI-Driven Career Ecosystem
   • Built a full-stack React + Express application for Technical Education Dept, Govt of Rajasthan.
   • Integrated Gemini AI for real-time ATS resume scoring and skill gap analysis.
   • Implemented WCAG high-contrast accessibility mode and voice navigation controls.

2. E-Governance Citizen Grievance Portal
   • Developed a scalable Node.js backend handling 50,000+ mock Rajasthan citizen records.
   • Optimized SQL database query indexing, reducing latency by 40%.

EXPERIENCE
Full Stack Development Intern | Local Tech Solutions, Jaipur (June 2023 – Aug 2023)
   • Developed 12+ reusable React UI components with Tailwind CSS.
   • Collaborated with senior engineers on RESTful API endpoints and unit tests.

ACHIEVEMENTS
   • 1st Rank, HackRajasthan State Hackathon 2023
   • Finalist, Smart India Hackathon (SIH 2023)
   • Gold Elite Certification, NPTEL Cloud Computing & Virtualization`);

  const [showTextEditor, setShowTextEditor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [result, setResult] = useState<AIResumeAnalysis | null>(null);

  // Helper to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Trigger Native File Manager
  const handleOpenFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Convert file to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1] || result;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Process chosen file from File Manager
  const processFile = async (file: File) => {
    try {
      const sizeStr = formatFileSize(file.size);
      let base64: string | undefined;

      if (file.type.includes('pdf') || file.name.toLowerCase().endsWith('.pdf')) {
        base64 = await fileToBase64(file);
      }

      // Try reading text if text or markdown
      if (
        file.type.includes('text') ||
        file.name.endsWith('.txt') ||
        file.name.endsWith('.md') ||
        file.name.endsWith('.rtf')
      ) {
        const text = await file.text();
        if (text.trim()) {
          setResumeText(text);
        }
      } else if (file.type.includes('pdf') || file.name.endsWith('.pdf')) {
        // Attempt text extraction from printable segments of the buffer
        try {
          const buffer = await file.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          const decoder = new TextDecoder('utf-8', { fatal: false });
          const raw = decoder.decode(bytes);
          const words = raw.match(/[A-Za-z0-9+#./@\-_,]{2,}/g);
          if (words && words.length > 30) {
            const clean = words
              .filter(w => !/[\\/{}<>]/.test(w) && w.length < 35)
              .slice(0, 500)
              .join(' ');
            if (clean.length > 100) {
              setResumeText(`[Extracted from ${file.name}]\n\n` + clean);
            }
          }
        } catch {
          // Keep current resumeText as base
        }
      }

      setUploadedFile({
        file,
        name: file.name,
        size: sizeStr,
        type: file.type || 'Document',
        base64
      });

      // Clear any previous result to prompt fresh scoring
      setResult(null);
    } catch (err) {
      console.error('Error processing file:', err);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Run ATS Analysis
  const handleAnalyze = async () => {
    setLoading(true);
    setLoadingStage('Connecting to Gemini ATS Scoring Engine...');

    const fileInfo: ResumeFileInfo | undefined = uploadedFile
      ? {
          name: uploadedFile.name,
          size: uploadedFile.file.size,
          type: uploadedFile.file.type || 'application/pdf',
          base64: uploadedFile.base64
        }
      : undefined;

    const timer1 = setTimeout(() => {
      setLoadingStage('Scanning document hierarchy, syntax & keyword density...');
    }, 900);

    const timer2 = setTimeout(() => {
      setLoadingStage('Benchmarking skills against Rajasthan Tech Industry parameters...');
    }, 1800);

    try {
      const analysis = await analyzeResumeWithAI(resumeText, fileInfo);
      clearTimeout(timer1);
      clearTimeout(timer2);
      setResult(analysis);

      if (analysis.atsScore >= 80) {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (onBadgeUnlocked) {
          onBadgeUnlocked('ATS Masters', 'Achieved >80% ATS Resume Compatibility Score!');
        }
      }
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input linked directly to native File Manager */}
      <input
        ref={fileInputRef}
        id="resume-file-manager-input"
        type="file"
        accept=".pdf,.docx,.doc,.txt,.rtf,.md"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/20 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Gemini ATS & Career Scanner</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>AI Resume Analyzer & ATS Scanner</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Upload your resume directly from your device file manager (PDF, DOCX, or TXT) to obtain instant AI ATS match scoring, grammar rating, skill extraction, and recruiter recommendations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleOpenFilePicker}
            id="btn-open-file-manager-top"
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <FolderOpen className="h-4 w-4 text-slate-950" />
            <span>Browse File Manager</span>
          </button>
        </div>
      </div>

      {!result ? (
        /* Input & Upload View */
        <div className="space-y-6">
          {/* File Upload Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`p-8 rounded-3xl border-2 border-dashed transition-all text-center relative overflow-hidden ${
              dragActive
                ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
                : uploadedFile
                ? 'border-emerald-500/40 bg-emerald-500/5'
                : 'border-white/15 bg-white/5 hover:border-cyan-500/40 hover:bg-white/[0.07]'
            }`}
          >
            {!uploadedFile ? (
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center shadow-inner group">
                  <UploadCloud className="h-8 w-8 group-hover:scale-110 transition-transform" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Upload Your Resume from File Manager
                  </h3>
                  <p className="text-xs text-slate-400">
                    Click the button below to open your device file manager, or drag and drop your file here.
                  </p>
                </div>

                {/* PROMINENT FILE MANAGER BUTTON */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleOpenFilePicker}
                    id="btn-redirect-file-manager"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/30 inline-flex items-center justify-center space-x-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <FolderOpen className="h-5 w-5 text-slate-950" />
                    <span>Open File Manager & Select Resume</span>
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-400 pt-2 font-mono">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>PDF</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>DOCX</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>TXT</span>
                  </span>
                  <span>•</span>
                  <span>Max 10MB</span>
                </div>
              </div>
            ) : (
              /* Selected File Information */
              <div className="max-w-xl mx-auto space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-left flex items-center justify-between shadow-2xl">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                      <FileCheck className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-white truncate">
                          {uploadedFile.name}
                        </h4>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Ready
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {uploadedFile.size} • {uploadedFile.type || 'Resume Document'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={handleOpenFilePicker}
                      title="Select different file from File Manager"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 text-xs font-semibold flex items-center space-x-1 border border-white/10 transition-colors cursor-pointer"
                    >
                      <FolderOpen className="h-4 w-4" />
                      <span className="hidden sm:inline">Change</span>
                    </button>
                    <button
                      onClick={handleRemoveFile}
                      title="Remove uploaded file"
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    id="btn-analyze-uploaded-resume"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/30 flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Sparkles className="h-4 w-4 animate-spin text-slate-950" />
                        <span>Evaluating with Gemini AI...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 text-slate-950 fill-current" />
                        <span>Analyze Uploaded Resume & Get Score</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowTextEditor(!showTextEditor)}
                    className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5 text-slate-400" />
                    <span>{showTextEditor ? 'Hide Resume Text' : 'View Extracted Text'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Optional Text Review / Fallback Manual Input */}
          {(showTextEditor || !uploadedFile) && (
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  <span>Resume Content / Extracted Text</span>
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleOpenFilePicker}
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium flex items-center space-x-1"
                  >
                    <FolderOpen className="h-3.5 w-3.5" />
                    <span>Upload file instead</span>
                  </button>
                </div>
              </div>

              <textarea
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                rows={isModal ? 8 : 10}
                className="w-full p-4 text-xs font-mono rounded-2xl border border-white/10 bg-slate-950 text-slate-200 focus:outline-none focus:border-cyan-400 leading-relaxed scrollbar-thin"
                placeholder="Paste or review your resume plain text here..."
              />

              {!uploadedFile && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>Evaluates Skills, Education, Projects & ATS compatibility</span>
                  </div>

                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleOpenFilePicker}
                      id="btn-bottom-file-picker"
                      className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <FolderOpen className="h-4 w-4" />
                      <span>Choose File</span>
                    </button>

                    <button
                      onClick={handleAnalyze}
                      disabled={loading || !resumeText.trim()}
                      id="btn-run-ats-scan-text"
                      className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Sparkles className="h-4 w-4 animate-spin text-slate-950" />
                          <span>Scanning...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 text-slate-950 fill-current" />
                          <span>Run AI ATS Scan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading Animation Overlay */}
          {loading && (
            <div className="p-8 rounded-3xl bg-cyan-950/20 border border-cyan-500/30 text-center space-y-4 animate-pulse">
              <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-cyan-300">{loadingStage}</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Gemini Flash AI is parsing formatting, keywords, and technical depth...
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results / ATS Score View */
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Top Score Cards Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* ATS Score */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/40 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center justify-center space-x-1">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>Overall ATS Match Score</span>
              </span>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 my-2">
                {result.atsScore}%
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
                {result.atsScore >= 80 ? 'High ATS Compatibility' : result.atsScore >= 70 ? 'Moderate Match' : 'Needs Optimization'}
              </div>
            </div>

            {/* Grammar Score */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-indigo-500/30 text-center shadow-xl">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center justify-center space-x-1">
                <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                <span>Grammar & Tone</span>
              </span>
              <div className="text-5xl font-black text-indigo-300 my-2">
                {result.grammarScore}%
              </div>
              <p className="text-xs text-indigo-200/70">Clean Professional Syntax</p>
            </div>

            {/* Formatting Score */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 text-center shadow-xl">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center space-x-1">
                <FileCheck className="h-4 w-4 text-emerald-400" />
                <span>Formatting & Layout</span>
              </span>
              <div className="text-5xl font-black text-emerald-300 my-2">
                {result.formattingScore}%
              </div>
              <p className="text-xs text-emerald-200/70">Scannable ATS Structure</p>
            </div>
          </div>

          {/* Uploaded File Reference Badge if present */}
          {uploadedFile && (
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center space-x-2">
                <FileCheck className="h-4 w-4 text-cyan-400" />
                <span>Analyzed file: <strong className="text-white">{uploadedFile.name}</strong> ({uploadedFile.size})</span>
              </span>
              <button
                onClick={handleOpenFilePicker}
                className="text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center space-x-1 cursor-pointer"
              >
                <FolderOpen className="h-3.5 w-3.5" />
                <span>Upload Another File</span>
              </button>
            </div>
          )}

          {/* Extracted Technical Skills */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-cyan-400" />
                <span>Extracted Technical Competencies ({result.extractedSkills.length})</span>
              </span>
              <span className="text-[11px] text-cyan-400 font-mono">Matched by AI</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.extractedSkills.map((sk, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 font-medium text-xs border border-cyan-400/30 flex items-center space-x-1"
                >
                  <span>{sk}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Resume Strengths</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                {result.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="p-6 rounded-3xl bg-amber-950/20 border border-amber-500/30 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span>Areas to Improve ATS Compatibility</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                {result.improvements.map((imp, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Missing Keywords Section */}
          {result.missingKeywords && result.missingKeywords.length > 0 && (
            <div className="p-6 rounded-3xl bg-purple-950/20 border border-purple-500/30 space-y-3">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center space-x-2">
                <Search className="h-4 w-4 text-purple-400" />
                <span>Recommended Keywords to Add for Higher ATS Score</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={handleOpenFilePicker}
                id="btn-upload-new-resume"
                className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <FolderOpen className="h-4 w-4" />
                <span>Upload New Resume File</span>
              </button>

              <button
                onClick={() => setResult(null)}
                className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Re-analyze Text</span>
              </button>
            </div>

            <button
              onClick={handleDownloadReport}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white text-slate-950 font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download ATS Report (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
