import {
  StudentProfile,
  Job,
  Internship,
  Application,
  Scholarship,
  Hackathon,
  MentorshipSlot,
  FraudReport,
  DistrictAnalytics
} from '../types';

export const INITIAL_STUDENT: StudentProfile = {
  id: 'std_101',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@mbm.ac.in',
  phone: '+91 98290 12345',
  college: 'MBM University, Jodhpur',
  branch: 'Computer Science & Engineering',
  semester: 7,
  cgpa: 8.7,
  skills: ['React.js', 'Node.js', 'TypeScript', 'Python', 'Tailwind CSS', 'SQL', 'Git'],
  preferredLocation: 'Jaipur / Remote',
  preferredSalary: 10,
  preferredDomain: 'Software Engineering / AI',
  resumeUrl: 'aarav_sharma_resume_2024.pdf',
  resumeScore: 84,
  githubUrl: 'https://github.com/aarav-sharma-tech',
  linkedinUrl: 'https://linkedin.com/in/aarav-sharma-rajasthan',
  achievements: ['1st Rank - HackRajasthan 2023', 'SIH 2023 Finalist', 'NPTEL Cloud Computing Gold'],
  district: 'Jodhpur',
  category: 'General',
  annualIncome: 350000,
  gender: 'Male',
  badges: [
    { id: 'b1', title: 'SIH 2024 Contender', description: 'Selected for Smart India Hackathon finals', icon: 'Trophy', unlockedAt: '2024-06-15' },
    { id: 'b2', title: 'ATS Masters', description: 'Achieved >80% ATS Resume score', icon: 'FileCheck', unlockedAt: '2024-05-10' },
    { id: 'b3', title: 'Rajasthan Tech Elite', description: 'Top 5% CGPA in CSE department', icon: 'Award', unlockedAt: '2024-04-01' }
  ]
};

export const MOCK_STUDENT = INITIAL_STUDENT;

export const MOCK_JOBS: Job[] = [
  {
    id: 'job_01',
    title: 'Full Stack Software Engineer',
    company: 'Metacube Software',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&q=80',
    location: 'Jaipur, Rajasthan',
    type: 'Full-time',
    salary: '₹8.5 - ₹12.0 LPA',
    numericMinSalary: 8.5,
    numericMaxSalary: 12.0,
    skillsRequired: ['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'REST APIs'],
    minCgpa: 7.5,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication'],
    description: 'Build enterprise-grade SaaS web applications for international clients. Work in modern agile squads in Jaipur IT Hub.',
    postedDate: '2024-07-28',
    deadline: '2024-08-30',
    applicantsCount: 142,
    trustScore: 98,
    isFraudFlagged: false,
    category: 'Private',
    district: 'Jaipur'
  },
  {
    id: 'job_02',
    title: 'Associate AI/ML Engineer',
    company: 'Infosys Limited',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&q=80',
    location: 'SEZ Mahindra World City, Jaipur',
    type: 'Full-time',
    salary: '₹9.0 - ₹14 LPA',
    numericMinSalary: 9.0,
    numericMaxSalary: 14.0,
    skillsRequired: ['Python', 'TensorFlow', 'PyTorch', 'FastAPI', 'Machine Learning'],
    minCgpa: 8.0,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Data Science & AI'],
    description: 'Develop GenAI and LLM-powered enterprise automation bots and predictive analytics engines for Global 500 enterprises.',
    postedDate: '2024-07-25',
    deadline: '2024-08-25',
    applicantsCount: 210,
    trustScore: 99,
    isFraudFlagged: false,
    category: 'Private',
    district: 'Jaipur'
  },
  {
    id: 'job_03',
    title: 'Junior Cloud & DevOps Specialist',
    company: 'TCS (Tata Consultancy Services)',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
    location: 'Jodhpur / Remote',
    type: 'Full-time',
    salary: '₹7.0 - ₹9.5 LPA',
    numericMinSalary: 7.0,
    numericMaxSalary: 9.5,
    skillsRequired: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'CI/CD'],
    minCgpa: 7.0,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Electrical Engineering'],
    description: 'Manage cloud infrastructure deployments on AWS and Azure. Implement automated CI/CD pipelines.',
    postedDate: '2024-07-20',
    deadline: '2024-08-15',
    applicantsCount: 185,
    trustScore: 97,
    isFraudFlagged: false,
    category: 'Private',
    district: 'Jodhpur'
  },
  {
    id: 'job_04',
    title: 'Assistant System Engineer (Rajasthan IT Infrastructure)',
    company: 'DOITC Govt of Rajasthan',
    companyLogo: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=120&q=80',
    location: 'Jaipur Secretariat, Rajasthan',
    type: 'Full-time',
    salary: '₹10.5 - ₹13.0 LPA',
    numericMinSalary: 10.5,
    numericMaxSalary: 13.0,
    skillsRequired: ['SQL', 'Cyber Security', 'Network Administration', 'Python', 'e-Governance'],
    minCgpa: 7.5,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication'],
    description: 'Manage e-Governance digital infrastructure, Bhashini AI translation gateways, and Jan Aadhaar portal databases for Rajasthan state.',
    postedDate: '2024-07-15',
    deadline: '2024-09-01',
    applicantsCount: 420,
    trustScore: 100,
    isFraudFlagged: false,
    category: 'Government',
    district: 'Jaipur'
  },
  {
    id: 'job_05',
    title: 'Cyber Security Analyst',
    company: 'Gravita CyberSec',
    location: 'Kota, Rajasthan',
    type: 'Full-time',
    salary: '₹8.0 - ₹11 LPA',
    numericMinSalary: 8.0,
    numericMaxSalary: 11.0,
    skillsRequired: ['Ethical Hacking', 'Wireshark', 'Python', 'SIEM', 'Penetration Testing'],
    minCgpa: 7.2,
    allowedBranches: ['Computer Science & Engineering', 'Cyber Security', 'Information Technology'],
    description: 'Perform vulnerability assessments and penetration testing for smart grid and IoT devices in industrial centers.',
    postedDate: '2024-07-10',
    deadline: '2024-08-20',
    applicantsCount: 95,
    trustScore: 94,
    isFraudFlagged: false,
    category: 'Private',
    district: 'Kota'
  },
  {
    id: 'job_06',
    title: 'Frontend React UI Developer (Suspicious - Under Review)',
    company: 'FastCrypto Global Technologies',
    location: 'Remote - Jaipur',
    type: 'Full-time',
    salary: '₹25.0 - ₹35 LPA',
    numericMinSalary: 25.0,
    numericMaxSalary: 35.0,
    skillsRequired: ['React', 'Crypto'],
    minCgpa: 5.0,
    allowedBranches: ['All Branches'],
    description: 'Pay ₹2,000 application security fee first to get instant placement. Urgent hiring without technical interview.',
    postedDate: '2024-08-01',
    deadline: '2024-08-05',
    applicantsCount: 12,
    trustScore: 15,
    isFraudFlagged: true,
    category: 'Private',
    district: 'Jaipur'
  }
];

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'int_01',
    title: 'Frontend Web Development Intern',
    company: 'Zoho Corporation',
    location: 'Jaipur / Remote',
    stipend: '₹30,000 / month',
    duration: '6 Months',
    skillsRequired: ['React.js', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'],
    minSemester: 5,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'MCA'],
    postedDate: '2024-07-29',
    deadline: '2024-08-28',
    applicantsCount: 310
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app_001',
    jobId: 'job_01',
    jobTitle: 'Full Stack Software Engineer',
    company: 'Metacube Software',
    studentId: 'std_101',
    studentName: 'Aarav Sharma',
    college: 'MBM University, Jodhpur',
    branch: 'Computer Science & Engineering',
    cgpa: 8.7,
    appliedDate: '2024-07-29',
    status: 'Interview Scheduled',
    matchScore: 92,
    aiRank: 1,
    notes: 'Technical Interview round scheduled for 10th August 2024.'
  },
  {
    id: 'app_002',
    jobId: 'job_02',
    jobTitle: 'Associate AI/ML Engineer',
    company: 'Infosys Limited',
    studentId: 'std_101',
    studentName: 'Aarav Sharma',
    college: 'MBM University, Jodhpur',
    branch: 'Computer Science & Engineering',
    cgpa: 8.7,
    appliedDate: '2024-07-26',
    status: 'Shortlisted',
    matchScore: 88,
    aiRank: 3,
    notes: 'Resume screened. Awaiting online coding test link.'
  }
];

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'sch_1',
    title: 'Mukhyamantri Uchcha Shiksha Chhatravriti Yojana',
    offeredBy: 'Department of Higher Education, Govt of Rajasthan',
    amount: '₹5,000 / year',
    eligibility: '12th Pass with >= 60% marks, Resident of Rajasthan',
    deadline: '2024-10-31',
    category: 'All Categories',
    maxIncomeLakhs: 2.5
  },
  {
    id: 'sch_2',
    title: 'Rajasthan Post-Matric Scholarship (SJE)',
    offeredBy: 'Social Justice & Empowerment Dept, Govt of Rajasthan',
    amount: 'Full Tuition Fee Waiver + Allowance',
    eligibility: 'SC / ST / OBC / SBC / EBC students enrolled in engineering',
    deadline: '2024-11-15',
    category: 'SC / ST / OBC',
    maxIncomeLakhs: 2.5
  },
  {
    id: 'sch_3',
    title: 'Kalibai Bhil Medhavi Chhatra Scooty Yojana',
    offeredBy: 'Govt of Rajasthan Technical Education',
    amount: 'Free Free Motor Scooty + Certificate',
    eligibility: 'Meritorious Female Engineering & Diploma Students',
    deadline: '2024-09-30',
    category: 'Female Students',
    targetGender: 'Female',
    minCgpa: 8.0
  }
];

export const MOCK_HACKATHONS: Hackathon[] = [
  {
    id: 'hack_1',
    title: 'Smart India Hackathon 2024 (SIH 1632)',
    organizer: 'Ministry of Education & AICTE, Govt of India',
    prizePool: '₹1,00,000 / Problem Statement',
    deadline: '2024-09-15',
    tags: ['AI', 'EdTech', 'GovTech', 'Web3'],
    mode: 'Hybrid',
    location: 'Jaipur Grand Finale'
  }
];

export const MOCK_MENTORS: MentorshipSlot[] = [
  {
    id: 'men_1',
    mentorName: 'Priya Rathore',
    mentorRole: 'Senior Staff Engineer',
    company: 'Google Cloud India',
    rating: 4.9,
    expertise: ['System Design', 'AI Engineering', 'Resume Review'],
    availableTime: 'Tomorrow at 6:00 PM IST',
    price: 'Free for Rajasthan Govt Students'
  },
  {
    id: 'men_2',
    mentorName: 'Vikramaditya Singh',
    mentorRole: 'Lead Product Architect',
    company: 'Microsoft Azure',
    rating: 4.8,
    expertise: ['DevOps', 'Microservices', 'Interview Prep'],
    availableTime: 'Saturday at 11:00 AM IST',
    price: 'Free for Rajasthan Govt Students'
  }
];

export const MOCK_FRAUD_REPORTS: FraudReport[] = [
  {
    id: 'frd_1',
    companyName: 'FastCrypto Global Technologies',
    jobTitle: 'Frontend React UI Developer',
    flagReason: 'Requested advance fee payment of ₹2,000 for placement security deposit.',
    riskLevel: 'Critical',
    reportedDate: '2024-08-01',
    status: 'Confirmed Fraud'
  }
];

export const RAJASTHAN_DISTRICT_ANALYTICS: DistrictAnalytics[] = [
  { district: 'Jaipur', collegesCount: 42, studentsCount: 18500, placedStudents: 14800, placementRate: 80.0, avgPackageLpa: 7.8, topSkillInDemand: 'Full Stack & AI', femalePlacementRate: 78.5, ruralStudentsCount: 6200 },
  { district: 'Jodhpur', collegesCount: 28, studentsCount: 11200, placedStudents: 8510, placementRate: 76.0, avgPackageLpa: 6.9, topSkillInDemand: 'Python & Cloud', femalePlacementRate: 74.0, ruralStudentsCount: 4800 },
  { district: 'Kota', collegesCount: 22, studentsCount: 9400, placedStudents: 7238, placementRate: 77.0, avgPackageLpa: 7.2, topSkillInDemand: 'IoT & Embedded', femalePlacementRate: 75.2, ruralStudentsCount: 3900 },
  { district: 'Udaipur', collegesCount: 19, studentsCount: 7800, placedStudents: 5694, placementRate: 73.0, avgPackageLpa: 6.2, topSkillInDemand: 'Data Analytics', femalePlacementRate: 71.0, ruralStudentsCount: 3500 },
  { district: 'Bikaner', collegesCount: 14, studentsCount: 5200, placedStudents: 3640, placementRate: 70.0, avgPackageLpa: 5.8, topSkillInDemand: 'Cyber Security', femalePlacementRate: 68.0, ruralStudentsCount: 2800 },
  { district: 'Ajmer', collegesCount: 16, studentsCount: 6100, placedStudents: 4575, placementRate: 75.0, avgPackageLpa: 6.4, topSkillInDemand: 'Java & Web Dev', femalePlacementRate: 76.8, ruralStudentsCount: 2600 }
];

export const MOCK_DISTRICTS = RAJASTHAN_DISTRICT_ANALYTICS.map((d, i) => ({
  id: `dist_${i + 1}`,
  name: d.district,
  collegesCount: d.collegesCount,
  studentsCount: d.studentsCount,
  placementRate: d.placementRate,
  avgPackageLpa: d.avgPackageLpa,
  topSkills: [d.topSkillInDemand, 'TypeScript', 'SQL'],
  majorIndustries: ['Mahindra World City SEZ', 'Metacube', 'Genpact']
}));
