export type ProjectCategory = 'android' | 'web';

export type ProjectStatus = 'Released' | 'Completed' | 'In Development' | 'Open Source';

export type ProjectPreviewType =
  | 'taskflow'
  | 'expense-tracker'
  | 'freshkart'
  | 'web-railspace'
  | 'web-alumni'
  | 'github-android';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  platformLabel: string;
  timeline?: string;
  status: ProjectStatus;
  description: string;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  apkUrl?: string;
  liveUrl?: string;
  screenshotPath?: string;
  previewType: ProjectPreviewType;
  featured?: boolean;
  fromGitHub?: boolean;
}

export interface SkillItem {
  name: string;
  iconKey: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  isPrimary?: boolean;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  domainNote: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  university?: string;
  location: string;
  period: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage?: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
}

export interface GitHubActivityResponse {
  available: boolean;
  reason?: string;
  profileUrl?: string;
  fetchedAt?: string;
  profile?: {
    login: string;
    name: string;
    bio: string | null;
    avatarUrl: string;
    htmlUrl: string;
    publicRepos: number;
    followers: number;
    following: number;
    location: string | null;
  };
  repositories?: GitHubRepository[];
  androidRepositories?: GitHubRepository[];
  languages?: { name: string; count: number }[];
  recentEvents?: {
    id: string;
    type: string;
    repoName: string;
    createdAt: string;
  }[];
}
