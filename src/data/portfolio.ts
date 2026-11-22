import type {
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillCategory,
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Om Soni',
  roleTitle: 'Android Developer | Kotlin | Jetpack Compose',
  location: 'Bhopal, Madhya Pradesh, India',
  educationShort: 'B.Tech in Computer Science Engineering',
  availability: 'Open to Android Developer Opportunities',
  email: 'somofficial9661@gmail.com',
  phone: '+91 9661889540',
  githubUrl: 'https://github.com/omsoni21',
  linkedinUrl: 'https://linkedin.com/in/om-soni-57a424256',
  portraitPath: '/assets/aistudio/im1_39ca8dd6.png',
  resumePdfPath: '/resume.pdf',
  resumeDownloadPath: '/resume.pdf?download=1',
  // Optional: paste your free Formspree URL here (e.g. 'https://formspree.io/f/xxxxxxxx')
  // or set VITE_FORMSPREE_ENDPOINT in your environment. Leave empty to use pre-filled mailto:.
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() || '',
  heroHeadline: 'Building Modern Android Experiences.',
  heroDescription:
    "I'm a Computer Science graduate passionate about Native Android Development. I build modern, intuitive, and scalable Android applications using Kotlin, Jetpack Compose, Material Design 3, and modern Android architecture.",
  aboutDescription:
    "I'm a Computer Science Engineering graduate with a strong interest in Native Android Application Development. I enjoy transforming ideas into practical mobile experiences using Kotlin and Jetpack Compose. My focus is on building scalable, maintainable, and user-friendly Android applications while continuously improving my understanding of Android architecture, UI development, and modern development practices.",
  languagesKnown: ['English', 'Hindi'],
};

/**
 * Reusable project catalog.
 * To add a new Android project or screenshot, append a new ProjectItem object below.
 * Set `screenshotPath` to a real asset path under `/assets/...` when screenshots are ready.
 */
export const PROJECTS: ProjectItem[] = [
  {
    id: 'taskflow',
    title: 'Taskflow',
    category: 'android',
    platformLabel: 'Native Android',
    status: 'Released',
    featured: true,
    description:
      'A modern Android task management and daily productivity application built to simplify task organization and improve everyday productivity.',
    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'Material Design 3',
      'Room Database',
    ],
    highlights: [
      'Clean daily task capture, categorization, and completion workflows',
      'Declarative UI built with Jetpack Compose and Material Design 3 theming',
      'Offline-first local persistence powered by Room Database',
      'Installable Android build distributed directly via release APK',
    ],
    githubUrl: 'https://github.com/omsoni21/Taskflow',
    apkUrl: 'https://github.com/omsoni21/Taskflow/raw/main/Taskflow-v1.0.apk',
    screenshotPath: '/assets/projects/taskflow.jpg',
    previewType: 'taskflow',
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker Android App',
    category: 'android',
    platformLabel: 'Native Android',
    timeline: 'Dec 2025 – Jan 2026',
    status: 'Completed',
    featured: true,
    description:
      'An Android application for tracking daily expenses and income, built with Jetpack Compose, Material Design principles, Room Database, and MVVM architecture.',
    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'Material Design 3',
      'Room Database',
      'MVVM Architecture',
    ],
    highlights: [
      'Tracks daily expenses and income with clear category breakdowns',
      'Modern reactive UI built with Jetpack Compose and Material Design',
      'Integrated Room Database for structured local storage and fast queries',
      'Applied MVVM architecture and design patterns for maintainable code',
    ],
    screenshotPath: '/assets/projects/expense-tracker.jpg',
    previewType: 'expense-tracker',
  },
  {
    id: 'freshkart',
    title: 'FreshKart',
    category: 'android',
    platformLabel: 'Native Android Concept',
    status: 'In Development',
    description:
      'A modern grocery shopping Android application concept designed to provide a seamless shopping experience with customer and seller functionality.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    highlights: [
      'Planned dual-role customer browsing and seller inventory workflows',
      'Jetpack Compose UI architecture currently under active development',
      'Firebase integration planned for real-time catalog and order sync',
    ],
    screenshotPath: '/assets/projects/freshkart.jpg',
    previewType: 'freshkart',
  },
  {
    id: 'railspace-lease',
    title: 'Railspace Lease Management System',
    category: 'web',
    platformLabel: 'Web Application',
    timeline: 'Sep 2025 – Nov 2025',
    status: 'Completed',
    description:
      'A structured workflow management system for railway leases, featuring API integrations, optimized UI usability, and scalable frontend architecture.',
    technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'REST APIs'],
    highlights: [
      'Structured multi-step workflows for railway lease tracking',
      'Integrated backend APIs with optimized rendering performance',
      'Scalable component architecture built for future AI workflow extensions',
    ],
    screenshotPath: '/assets/projects/railspace-lease.jpg',
    previewType: 'web-railspace',
  },
  {
    id: 'alumni-platform',
    title: 'Alumni Association Platform',
    category: 'web',
    platformLabel: 'Web Application',
    timeline: 'Mar 2025 – May 2025',
    status: 'Released',
    description:
      'A full-stack alumni networking platform featuring user authentication, database integration, scalable data handling, and responsive UI design.',
    technologies: ['JavaScript', 'MongoDB', 'Authentication', 'Responsive UI'],
    highlights: [
      'User authentication and structured alumni directory networking',
      'Scalable MongoDB data modeling for member profiles and updates',
      'Responsive cross-device interface deployed live on Netlify',
    ],
    liveUrl: 'https://alumni-ses.netlify.app',
    screenshotPath: '/assets/projects/alumni-platform.jpg',
    previewType: 'web-alumni',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'android-dev',
    title: 'Android Development',
    subtitle: 'Primary Engineering Focus',
    isPrimary: true,
    skills: [
      { name: 'Kotlin', iconKey: 'code' },
      { name: 'Jetpack Compose', iconKey: 'layers' },
      { name: 'Android SDK', iconKey: 'smartphone' },
      { name: 'Material Design 3', iconKey: 'palette' },
      { name: 'Android Studio', iconKey: 'terminal' },
      { name: 'Room Database', iconKey: 'database' },
      { name: 'ViewModel', iconKey: 'cpu' },
      { name: 'Navigation Compose', iconKey: 'compass' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture & Development',
    subtitle: 'Patterns, Concurrency & Backend',
    skills: [
      { name: 'MVVM Architecture', iconKey: 'git-fork' },
      { name: 'Repository Pattern', iconKey: 'folder-git' },
      { name: 'Kotlin Coroutines', iconKey: 'zap' },
      { name: 'State Management', iconKey: 'sliders' },
      { name: 'REST API Integration', iconKey: 'globe' },
      { name: 'Firebase', iconKey: 'flame' },
      { name: 'Firebase Cloud Messaging', iconKey: 'bell' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    subtitle: 'Build, Testing & Version Control',
    skills: [
      { name: 'Git', iconKey: 'git-branch' },
      { name: 'GitHub', iconKey: 'github' },
      { name: 'Gradle', iconKey: 'package' },
      { name: 'Postman', iconKey: 'send' },
      { name: 'VS Code', iconKey: 'code-2' },
      { name: 'Android Emulator', iconKey: 'tablet-smartphone' },
    ],
  },
  {
    id: 'additional-web',
    title: 'Additional Skills',
    subtitle: 'Frontend & Web Foundations',
    skills: [
      { name: 'React.js', iconKey: 'atom' },
      { name: 'Next.js', iconKey: 'box' },
      { name: 'TypeScript', iconKey: 'file-code' },
      { name: 'JavaScript', iconKey: 'braces' },
      { name: 'HTML5', iconKey: 'layout' },
      { name: 'CSS3', iconKey: 'paintbrush' },
      { name: 'Tailwind CSS', iconKey: 'wind' },
    ],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'tech-helper-intern',
    role: 'Frontend Developer Intern',
    company: 'Tech Helper & Technology',
    location: 'Bhopal, India',
    period: 'April 2024 – June 2024',
    domainNote: 'Web Frontend Engineering Internship',
    responsibilities: [
      'Developed responsive and reusable UI components using React.js, improving development efficiency and maintainability.',
      'Created responsive interfaces using Tailwind CSS and Bootstrap across multiple devices and screen sizes.',
      'Collaborated with UI/UX designers on implementation details and visual design consistency.',
      'Improved page performance and responsiveness through efficient rendering techniques.',
      'Used Git and GitHub for version control, code collaboration, and project tracking.',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'btech-cse',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science Engineering',
    institution: 'Sagar Institute of Science & Technology (SISTec GN)',
    university: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)',
    location: 'Bhopal, Madhya Pradesh',
    period: 'Sep 2022 – Jun 2026',
  },
  {
    id: 'higher-secondary',
    degree: 'Higher Secondary Education (Science)',
    field: 'Science Stream',
    institution: 'Ghaghra Inter Science College, Bagodar',
    location: 'Jharkhand, India',
    period: 'Jun 2020 – Jun 2022',
  },
];
