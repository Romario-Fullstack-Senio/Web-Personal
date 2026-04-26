import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'hero',
    loadComponent: () => import('./features/hero/hero.component').then((m) => m.HeroComponent),
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience.component').then((m) => m.ExperienceComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects.component').then((m) => m.ProjectsComponent),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills.component').then((m) => m.SkillsComponent),
  },
  {
    path: 'certifications',
    loadComponent: () =>
      import('./features/certifications/certifications.component').then(
        (m) => m.CertificationsComponent,
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
