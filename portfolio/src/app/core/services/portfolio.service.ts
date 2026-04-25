import { computed, Injectable, signal } from '@angular/core';
import { Experience, Project, ProjectCategory, Skill } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  // ── Signals ────────────────────────────────────────────────────────────────
  readonly activeFilter = signal<ProjectCategory>('all');

  // ── Raw Data ────────────────────────────────────────────────────────────────
  readonly experiences = signal<Experience[]>([
    {
      id: 1,
      role: 'Senior Full Stack Engineer',
      company: 'TechCorp Solutions',
      period: 'Ene 2023 – Presente',
      current: true,
      description:
        'Lideré el rediseño de la plataforma SaaS principal, migrando de Angular 12 a Angular 21 con arquitectura standalone. Reduje el tiempo de carga inicial en un 60% mediante SSR y lazy loading estratégico.',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Innovatech Agency',
      period: 'Mar 2021 – Dic 2022',
      description:
        'Desarrollé más de 12 aplicaciones web para clientes enterprise. Implementé pipelines CI/CD con GitHub Actions reduciendo tiempos de despliegue en un 40%.',
      technologies: ['React', 'TypeScript', 'NestJS', 'MongoDB', 'GitHub Actions'],
    },
    {
      id: 3,
      role: 'Frontend Developer',
      company: 'Startup Hub',
      period: 'Jun 2019 – Feb 2021',
      description:
        'Construí interfaces modernas y accesibles (WCAG 2.1). Participé en decisiones de arquitectura frontend y mentoría a desarrolladores junior.',
      technologies: ['Angular', 'RxJS', 'Sass', 'Jest', 'Storybook'],
    },
  ]);

  readonly projects = signal<Project[]>([
    {
      id: 1,
      title: 'E-Commerce Platform',
      description:
        'Plataforma de comercio electrónico con carrito en tiempo real, pagos con Stripe y panel de administración completo.',
      technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Redis', 'Stripe'],
      repoUrl: 'https://github.com/tu-usuario/ecommerce-platform',
      demoUrl: 'https://demo.tuportafolio.dev',
      featured: true,
      category: 'fullstack',
    },
    {
      id: 2,
      title: 'DevOps Dashboard',
      description:
        'Dashboard para monitoreo de microservicios con métricas en tiempo real, alertas y visualización de logs centralizados.',
      technologies: ['React', 'Node.js', 'InfluxDB', 'Grafana', 'Docker'],
      repoUrl: 'https://github.com/tu-usuario/devops-dashboard',
      featured: true,
      category: 'devops',
    },
    {
      id: 3,
      title: 'Task Manager API',
      description:
        'REST API robusta para gestión de tareas con autenticación JWT, roles, websockets y documentación Swagger completa.',
      technologies: ['NestJS', 'TypeORM', 'PostgreSQL', 'Socket.io', 'Swagger'],
      repoUrl: 'https://github.com/tu-usuario/task-manager-api',
      category: 'backend',
    },
    {
      id: 4,
      title: 'UI Component Library',
      description:
        'Librería de componentes Angular reutilizables con más de 30 componentes accesibles, publicada en NPM con 500+ descargas mensuales.',
      technologies: ['Angular', 'TypeScript', 'Storybook', 'Jest', 'NPM'],
      repoUrl: 'https://github.com/tu-usuario/ui-lib',
      demoUrl: 'https://storybook.tuportafolio.dev',
      category: 'frontend',
    },
  ]);

  readonly skills = signal<Skill[]>([
    // Frontend
    { name: 'Angular', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 92, category: 'Frontend' },
    { name: 'React', level: 80, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 88, category: 'Frontend' },
    { name: 'RxJS', level: 85, category: 'Frontend' },
    // Backend
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'NestJS', level: 85, category: 'Backend' },
    { name: 'REST APIs', level: 90, category: 'Backend' },
    // Database
    { name: 'PostgreSQL', level: 82, category: 'Database' },
    { name: 'MongoDB', level: 78, category: 'Database' },
    { name: 'Redis', level: 70, category: 'Database' },
    // DevOps
    { name: 'Docker', level: 80, category: 'DevOps' },
    { name: 'GitHub Actions', level: 85, category: 'DevOps' },
    { name: 'AWS', level: 72, category: 'DevOps' },
    // Tools
    { name: 'Git', level: 93, category: 'Tools' },
    { name: 'Jest', level: 80, category: 'Tools' },
  ]);

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
