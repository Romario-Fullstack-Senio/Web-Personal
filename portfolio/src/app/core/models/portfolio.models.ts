export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}
export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  current?: boolean;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  repoUrl: string;
  demoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  category: ProjectCategory;
}

export type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'devops' | 'all';

export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
  icon?: string;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'DevOps' | 'Tools' | 'Database';
