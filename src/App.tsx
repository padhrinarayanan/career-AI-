import React, { useState, useEffect } from 'react';
import { UserRole, StudentProfile, Job, Badge } from './types';
import { MOCK_STUDENT, MOCK_JOBS } from './data/mockData';
import { ParticleBackground } from './components/landing/ParticleBackground';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { VoiceNavigationModal } from './components/common/VoiceNavigationModal';
import { BadgeUnlockModal } from './components/common/BadgeUnlockModal';
import { Toast } from './components/common/Toast';
import { AIFloatingChatbot } from './components/ai/AIFloatingChatbot';

// Landing Page Sections
import { HeroSection } from './components/landing/HeroSection';
import { StatisticsSection } from './components/landing/StatisticsSection';
import { AIFeaturesGrid } from './components/landing/AIFeaturesGrid';
import { TrustedCompanies } from './components/landing/TrustedCompanies';
import { SuccessStories } from './components/landing/SuccessStories';
import { FAQSection } from './components/landing/FAQSection';
import { NewsletterSection } from './components/landing/NewsletterSection';

// Role Dashboards
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { RecruiterDashboard } from './components/dashboards/RecruiterDashboard';
import { CollegeDashboard } from './components/dashboards/CollegeDashboard';
import { GovtDashboard } from './components/dashboards/GovtDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { MentorDashboard } from './components/dashboards/MentorDashboard';

// AI Tool Modals & Views
import { AIResumeAnalyzer } from './components/ai/AIResumeAnalyzer';
import { AIResumeAnalyzerModal } from './components/ai/AIResumeAnalyzerModal';
import { AIInterviewCoachModal } from './components/ai/AIInterviewCoachModal';
import { AIJobRecommendations } from './components/ai/AIJobRecommendations';
import { AISkillGapAnalysis } from './components/ai/AISkillGapAnalysis';
import { AICareerPredictor } from './components/ai/AICareerPredictor';
import { AISalaryPredictor } from './components/ai/AISalaryPredictor';
import { AILearningRoadmap } from './components/ai/AILearningRoadmap';
import { AIScholarshipFinder } from './components/ai/AIScholarshipFinder';
import { AIDemandForecast } from './components/ai/AIDemandForecast';
import { AIResumeBuilderModal } from './components/ai/AIResumeBuilderModal';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('landing');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'HI' | 'RJ'>('EN');

  // Modals state
  const [voiceNavOpen, setVoiceNavOpen] = useState(false);
  const [activeAiTool, setActiveAiTool] = useState<string | null>(null);
  const [unlockedBadge, setUnlockedBadge] = useState<Badge | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Student State
  const [student, setStudent] = useState<StudentProfile>(MOCK_STUDENT);

  // Apply dark mode & high contrast classes to root html
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [isDarkMode, highContrast]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleUnlockBadge = (title: string, description: string) => {
    const newBadge: Badge = {
      id: `bdg_${Date.now()}`,
      title,
      description,
      unlockedAt: new Date().toISOString().split('T')[0],
      icon: 'Trophy',
    };
    setUnlockedBadge(newBadge);
  };

  const handleVoiceCommand = (command: string) => {
    const cmd = command.toLowerCase();
    if (cmd.includes('student') || cmd.includes('student portal')) {
      setCurrentRole('student');
      showToast('Switched to Student Portal via Voice');
    } else if (cmd.includes('recruiter') || cmd.includes('job post')) {
      setCurrentRole('recruiter');
      showToast('Switched to Recruiter Desk via Voice');
    } else if (cmd.includes('government') || cmd.includes('govt')) {
      setCurrentRole('govt');
      showToast('Switched to Govt Telemetry Portal via Voice');
    } else if (cmd.includes('resume') || cmd.includes('ats')) {
      setActiveAiTool('resume');
      showToast('Opening AI Resume Analyzer via Voice');
    } else if (cmd.includes('interview') || cmd.includes('voice interview')) {
      setActiveAiTool('interview');
      showToast('Opening Voice Interview Coach via Voice');
    } else if (cmd.includes('dark mode')) {
      setIsDarkMode(true);
      showToast('Dark Mode Enabled');
    } else if (cmd.includes('light mode')) {
      setIsDarkMode(false);
      showToast('Light Mode Enabled');
    }
  };

  const handleApplyJob = (job: Job) => {
    showToast(`Successfully Applied to ${job.title} at ${job.company}!`);
    handleUnlockBadge('Job Application Pioneer', `Submitted 1-click AI application for ${job.company}`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 ${highContrast ? 'contrast-125' : ''}`}>
      {/* Particle Background */}
      <ParticleBackground />

      {/* Global Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleSelect={setCurrentRole}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        language={language}
        onLanguageChange={setLanguage}
        onOpenVoiceNav={() => setVoiceNavOpen(true)}
      />

      {/* Toast Notifications */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Badge Unlock Modal */}
      <BadgeUnlockModal badge={unlockedBadge} onClose={() => setUnlockedBadge(null)} />

      {/* Voice Control Modal */}
      <VoiceNavigationModal
        isOpen={voiceNavOpen}
        onClose={() => setVoiceNavOpen(false)}
        onCommandDetected={handleVoiceCommand}
      />

      {/* AI Tool Modals */}
      <AIResumeAnalyzerModal
        isOpen={activeAiTool === 'resume'}
        onClose={() => setActiveAiTool(null)}
        onBadgeUnlocked={handleUnlockBadge}
      />

      <AIInterviewCoachModal
        isOpen={activeAiTool === 'interview'}
        onClose={() => setActiveAiTool(null)}
      />

      <AIResumeBuilderModal
        isOpen={activeAiTool === 'resumebuilder'}
        onClose={() => setActiveAiTool(null)}
        student={student}
      />

      {/* Main View Container */}
      <main className="relative z-10 pt-20">
        {currentRole === 'landing' && (
          <div className="space-y-12">
            <HeroSection
              onRoleSelect={setCurrentRole}
              onOpenTool={tool => setActiveAiTool(tool)}
            />
            <StatisticsSection />
            <AIFeaturesGrid onOpenTool={tool => setActiveAiTool(tool)} />

            {/* Embedded Active Views in Landing */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              {/* AI Resume Analyzer & ATS Scanner with direct File Manager Upload */}
              <section id="ai-resume-analyzer-section" className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <AIResumeAnalyzer onBadgeUnlocked={handleUnlockBadge} />
              </section>

              <section className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <AIJobRecommendations student={student} onApplyJob={handleApplyJob} />
              </section>

              <section className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <AISkillGapAnalysis student={student} />
              </section>

              <section className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <AICareerPredictor student={student} />
              </section>

              <section className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <AISalaryPredictor student={student} />
              </section>

              <section className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <AILearningRoadmap />
              </section>

              <section className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <AIScholarshipFinder student={student} />
              </section>

              <section className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <AIDemandForecast />
              </section>
            </div>

            <TrustedCompanies />
            <SuccessStories />
            <FAQSection />
            <NewsletterSection />
          </div>
        )}

        {/* Role Dashboards */}
        {currentRole !== 'landing' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentRole === 'student' && (
              <StudentDashboard
                student={student}
                onOpenTool={tool => setActiveAiTool(tool)}
              />
            )}
            {currentRole === 'recruiter' && <RecruiterDashboard />}
            {currentRole === 'college' && <CollegeDashboard />}
            {currentRole === 'govt' && <GovtDashboard />}
            {currentRole === 'admin' && <AdminDashboard />}
            {currentRole === 'mentor' && <MentorDashboard />}
          </div>
        )}
      </main>

      {/* Floating AI Assistant Chatbot */}
      <AIFloatingChatbot />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
