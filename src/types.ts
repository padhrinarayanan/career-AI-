export type UserRole = 
  | 'landing'
  | 'student'
  | 'recruiter'
  | 'college'
  | 'govt'
  | 'admin'
  | 'mentor'
  | 'STUDENT' 
  | 'RECRUITER' 
  | 'COLLEGE_OFFICER' 
  | 'GOVT_OFFICER' 
  | 'ADMIN' 
  | 'MENTOR';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  semester: number;
  cgpa: number;
  skills: string[];
  preferredLocation: string;
  preferredSalary: number; // in LPA
  preferredDomain: string;
  resumeUrl?: string;
  resumeScore?: number;
  githubUrl?: string;
  linkedinUrl?: string;
  achievements: string[];
  district: string;
  category: string; // Gen, OBC, SC, ST
  annualIncome: number;
  gender: 'Male' | 'Female' | 'Other';
  badges: Badge[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateUnlocked?: string;
  unlockedAt?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Internship';
  salary: string; // e.g. "₹8.5 - ₹12 LPA"
  numericMinSalary: number;
  numericMaxSalary: number;
  skillsRequired: string[];
  minCgpa: number;
  allowedBranches: string[];
  description: string;
  postedDate: string;
  deadline: string;
  applicantsCount: number;
  trustScore: number; // 0-100
  isFraudFlagged: boolean;
  category: 'Private' | 'Government' | 'PSU';
  district: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string; // e.g. "₹25,000 / month"
  duration: string; // e.g. "6 Months"
  skillsRequired: string[];
  minSemester: number;
  allowedBranches: string[];
  postedDate: string;
  deadline: string;
  applicantsCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  studentId: string;
  studentName: string;
  college: string;
  branch: string;
  cgpa: number;
  appliedDate: string;
  status: 'Submitted' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Offered' | 'Rejected';
  matchScore: number;
  aiRank: number;
  notes?: string;
}

export interface AIResumeAnalysis {
  atsScore: number;
  grammarScore: number;
  formattingScore: number;
  extractedSkills: string[];
  education: string[];
  experience: string[];
  projects: string[];
  achievements: string[];
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  missingKeywords: string[];
}

export interface JobRecommendationMatch {
  job: Job;
  matchingScore: number;
  reason: string;
  missingSkills: string[];
  selectionProbability: number;
}

export interface SkillGapAnalysisResult {
  jobTitle: string;
  missingSkills: { skill: string; priority: 'High' | 'Medium' | 'Low'; estimatedHours: number }[];
  recommendedCourses: { title: string; provider: string; url: string; duration: string; isFree: boolean }[];
  suggestedProjects: string[];
  totalLearningTimeWeeks: number;
}

export interface CareerPredictionResult {
  role: string;
  confidence: number;
  description: string;
  keyStrengths: string[];
  skillGaps: string[];
}

export interface SalaryPredictionResult {
  expectedMinLpa: number;
  expectedMaxLpa: number;
  medianLpa: number;
  breakdown: { factor: string; impact: string }[];
  peerPercentile: number;
}

export interface InterviewQuestion {
  id: string;
  type: 'Technical' | 'Coding' | 'HR' | 'Behavioral';
  question: string;
  idealAnswerHints: string[];
}

export interface InterviewEvaluation {
  score: number;
  confidenceScore: number;
  clarityScore: number;
  technicalAccuracy: number;
  strengths: string[];
  areasToImprove: string[];
  detailedFeedback: string;
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  topics: string[];
  project: string;
  certification?: string;
  completed?: boolean;
}

export interface Scholarship {
  id: string;
  title: string;
  offeredBy: string;
  amount: string;
  eligibility: string;
  deadline: string;
  category: string;
  targetGender?: string;
  maxIncomeLakhs?: number;
  minCgpa?: number;
}

export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  prizePool: string;
  deadline: string;
  tags: string[];
  mode: 'Online' | 'Offline' | 'Hybrid';
  location?: string;
}

export interface MentorshipSlot {
  id: string;
  mentorName: string;
  mentorRole: string;
  company: string;
  rating: number;
  expertise: string[];
  availableTime: string;
  price: string;
}

export interface FraudReport {
  id: string;
  companyName: string;
  jobTitle: string;
  flagReason: string;
  riskLevel: 'High' | 'Medium' | 'Critical';
  reportedDate: string;
  status: 'Under Investigation' | 'Confirmed Fraud' | 'Dismissed';
}

export interface DistrictAnalytics {
  district: string;
  collegesCount: number;
  studentsCount: number;
  placedStudents: number;
  placementRate: number;
  avgPackageLpa: number;
  topSkillInDemand: string;
  femalePlacementRate: number;
  ruralStudentsCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  audioUrl?: string;
}
