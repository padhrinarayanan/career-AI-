import React, { useState } from 'react';
import { UserRole } from '../../types';
import {
  Sparkles,
  Mic,
  Eye,
  Globe,
  Bell,
  Briefcase,
  GraduationCap,
  Building2,
  ShieldCheck,
  Award,
  ChevronDown,
  Sun,
  Moon,
  Volume2,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleSelect?: (role: UserRole) => void;
  onRoleChange?: (role: UserRole) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  setIsDarkMode?: (val: boolean | ((prev: boolean) => boolean)) => void;
  highContrast?: boolean;
  onToggleHighContrast?: () => void;
  setHighContrast?: (val: boolean | ((prev: boolean) => boolean)) => void;
  language?: string;
  onLanguageChange?: (lang: any) => void;
  setLanguage?: (lang: any) => void;
  onOpenVoiceNav?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleSelect,
  onRoleChange,
  activeTab = 'landing',
  setActiveTab,
  isDarkMode = true,
  onToggleTheme,
  setIsDarkMode,
  highContrast = false,
  onToggleHighContrast,
  setHighContrast,
  language = 'EN',
  onLanguageChange,
  setLanguage,
  onOpenVoiceNav
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    if (onRoleSelect) onRoleSelect(role);
    if (onRoleChange) onRoleChange(role);
  };

  const handleToggleTheme = () => {
    if (onToggleTheme) onToggleTheme();
    else if (setIsDarkMode) setIsDarkMode(prev => !prev);
  };

  const handleToggleHighContrast = () => {
    if (onToggleHighContrast) onToggleHighContrast();
    else if (setHighContrast) setHighContrast(prev => !prev);
  };

  const handleLangSelect = (code: string) => {
    if (onLanguageChange) onLanguageChange(code);
    else if (setLanguage) setLanguage(code);
  };

  const roles: { role: UserRole; label: string; icon: React.ReactNode; badge: string }[] = [
    { role: 'landing', label: 'Landing Overview', icon: <Sparkles className="h-4 w-4" />, badge: 'SIH 1632' },
    { role: 'student', label: 'Student Portal', icon: <GraduationCap className="h-4 w-4" />, badge: 'SIH Finalist' },
    { role: 'recruiter', label: 'Recruiter Hub', icon: <Briefcase className="h-4 w-4" />, badge: '5,000+ Hiring' },
    { role: 'college', label: 'College TPO Portal', icon: <Building2 className="h-4 w-4" />, badge: 'RTU & MBM' },
    { role: 'govt', label: 'Rajasthan Govt Officer', icon: <ShieldCheck className="h-4 w-4" />, badge: 'SIH 1632' },
    { role: 'admin', label: 'System Admin', icon: <Sparkles className="h-4 w-4" />, badge: 'Master Control' },
    { role: 'mentor', label: 'Career Mentor', icon: <Award className="h-4 w-4" />, badge: '1-on-1 Guidance' },
  ];

  const languages = [
    { code: 'EN', label: 'English' },
    { code: 'HI', label: 'हिंदी (Hindi)' },
    { code: 'RJ', label: 'राजस्थानी (Marwari)' }
  ];

  const handleSpeakText = () => {
    if ('speechSynthesis' in window) {
      if (speechActive) {
        window.speechSynthesis.cancel();
        setSpeechActive(false);
      } else {
        const textToRead = "Welcome to CareerConnect AI, the AI Powered Career Ecosystem for Technical Education Department, Government of Rajasthan.";
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        utterance.onend = () => setSpeechActive(false);
        window.speechSynthesis.speak(utterance);
        setSpeechActive(true);
      }
    }
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 backdrop-blur-xl transition-all duration-200 border-b ${
        highContrast
          ? 'bg-black text-white border-yellow-400'
          : 'bg-slate-900/60 text-white border-white/10 shadow-xl'
      }`}
    >
      {/* Top Govt of Rajasthan Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-white/5 py-1.5 px-4 text-xs font-medium flex justify-between items-center text-slate-300">
        <div className="flex items-center space-x-2 container mx-auto">
          <span className="bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
            SIH 2024
          </span>
          <span className="text-slate-200 font-semibold">
            SIH1632: Technical Education Department, Govt of Rajasthan
          </span>
          <span className="hidden md:inline-block text-cyan-400/80">
            • AI-Powered Unified Career Ecosystem
          </span>
        </div>
        <div className="hidden lg:flex items-center space-x-4 text-[11px] text-slate-400">
          <span>Helpline: 1800-180-6127</span>
          <span>|</span>
          <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-0.5 border border-white/10 text-slate-300">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-green-300">Rajasthan Smart Governance</span>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleRoleSelect('landing')}>
          <div className="w-9 h-9 bg-gradient-to-tr from-cyan-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-white/20">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">
                CareerConnect <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-400 -mt-0.5">
              Govt of Rajasthan Technical Education
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-2 font-medium text-xs">
          <button
            onClick={() => handleRoleSelect('landing')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              currentRole === 'landing'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold shadow-xs'
                : 'hover:bg-white/5 text-slate-300 hover:text-white'
            }`}
          >
            Explore Overview
          </button>

          <button
            onClick={() => handleRoleSelect('student')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              currentRole === 'student'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold shadow-xs'
                : 'hover:bg-white/5 text-slate-300 hover:text-white'
            }`}
          >
            <span>Student Portal</span>
          </button>

          <button
            onClick={() => handleRoleSelect('recruiter')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              currentRole === 'recruiter'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold shadow-xs'
                : 'hover:bg-white/5 text-slate-300 hover:text-white'
            }`}
          >
            <span>Recruiter Desk</span>
          </button>

          <button
            onClick={() => handleRoleSelect('govt')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              currentRole === 'govt'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold shadow-xs'
                : 'hover:bg-white/5 text-slate-300 hover:text-white'
            }`}
          >
            <span>Govt Analytics</span>
          </button>
        </nav>

        {/* Right Action Suite & Controls */}
        <div className="flex items-center space-x-2">
          {/* Role Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-xs font-bold text-white shadow-xs"
            >
              <div className="p-1 rounded-md bg-indigo-500/20 text-indigo-400">
                {roles.find(r => r.role === currentRole)?.icon}
              </div>
              <span className="hidden sm:inline-block">
                {roles.find(r => r.role === currentRole)?.label}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                    Switch Portal View
                  </p>
                </div>
                {roles.map(r => (
                  <button
                    key={r.role}
                    onClick={() => {
                      handleRoleSelect(r.role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      currentRole === r.role
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold'
                        : 'hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {r.icon}
                      <span>{r.label}</span>
                    </div>
                    <span className="text-[9px] bg-white/10 text-slate-300 px-2 py-0.5 rounded-full border border-white/10">
                      {r.badge}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessibility Suite Controls */}
          <div className="hidden sm:flex items-center space-x-1.5 border-l border-white/10 pl-2">
            {/* Voice Command Button */}
            <button
              onClick={onOpenVoiceNav}
              title="Voice Commands & Navigation"
              className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 transition-all"
            >
              <Mic className="h-4 w-4" />
            </button>

            {/* Read Aloud Button */}
            <button
              onClick={handleSpeakText}
              title="Text to Speech Accessibility Reader"
              className={`p-2 rounded-xl transition-all border ${
                speechActive
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 animate-bounce'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Volume2 className="h-4 w-4" />
            </button>

            {/* High Contrast Mode */}
            <button
              onClick={handleToggleHighContrast}
              title="Toggle High Contrast Mode (WCAG)"
              className={`p-2 rounded-xl transition-all border ${
                highContrast
                  ? 'bg-yellow-400 text-slate-950 font-bold border-yellow-300'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Eye className="h-4 w-4" />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all flex items-center space-x-1"
                title="Select Language"
              >
                <Globe className="h-4 w-4 text-cyan-400" />
                <span className="text-[11px] font-bold uppercase text-white">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-white/15 shadow-2xl p-1.5 z-50">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        handleLangSelect(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        language === l.code
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-white/15 shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="text-xs font-bold text-white">System Notifications</h4>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded-full font-bold">2 New</span>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-xs font-bold text-white">Interview Shortlist!</p>
                    <p className="text-[10px] text-slate-400">Metacube Jaipur scheduled Technical Round for Aug 10.</p>
                  </div>
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                    <p className="text-xs font-bold text-indigo-300">SIH 2024 Portal Update</p>
                    <p className="text-[10px] text-slate-400">New SIH1632 dataset published by Technical Education Dept.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-slate-950 p-4 space-y-3">
          <button
            onClick={() => {
              handleRoleSelect('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/10 font-bold text-sm text-white"
          >
            Explore Overview
          </button>
          <button
            onClick={() => {
              handleRoleSelect('student');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/10 font-bold text-sm text-white"
          >
            Student Portal
          </button>
          <button
            onClick={() => {
              handleRoleSelect('recruiter');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/10 font-bold text-sm text-white"
          >
            Recruiter Hub
          </button>
          <button
            onClick={() => {
              handleRoleSelect('govt');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/10 font-bold text-sm text-white"
          >
            Govt Telemetry
          </button>
        </div>
      )}
    </header>
  );
};

