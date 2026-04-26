import { computed, Injectable, signal } from '@angular/core';
import certificationsData from '../../shared/info/certifications.json';
import experiencesData from '../../shared/info/experiences.json';
import projectsData from '../../shared/info/projects.json';
import skillsData from '../../shared/info/skills.json';
import {
  Certification,
  Experience,
  Project,
  ProjectCategory,
  Skill,
} from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  // ── Signals ────────────────────────────────────────────────────────────────
  readonly activeFilter = signal<ProjectCategory>('all');

  // ── Raw Data ────────────────────────────────────────────────────────────────
  readonly experiences = signal<Experience[]>(experiencesData as Experience[]);

  readonly projects = signal<Project[]>(projectsData as Project[]);

  readonly skills = signal<Skill[]>(skillsData as Skill[]);

  // Certificaciones destacadas
  readonly certifications = signal<Certification[]>(certificationsData as Certification[]);

  // Link a consulta de certificados SENA por cédula
  readonly senaCertUrl = 'https://certificados.sena.edu.co/';

  // ── Computed Signals ────────────────────────────────────────────────────────
  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all'
      ? this.projects()
      : this.projects().filter((p) => p.category === filter);
  });

  readonly groupedSkills = computed(() => {
    const categories = [...new Set(this.skills().map((s) => s.category))];
    return categories.map((cat) => ({
      category: cat,
      items: this.skills().filter((s) => s.category === cat),
    }));
  });

  setFilter(filter: ProjectCategory): void {
    this.activeFilter.set(filter);
  }
}
