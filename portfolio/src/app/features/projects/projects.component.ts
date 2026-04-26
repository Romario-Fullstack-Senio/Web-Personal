import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectCategory } from '../../core/models/portfolio.models';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionTitleComponent],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  public readonly __portfolioService = inject(PortfolioService);

  public readonly filters: { label: string; value: ProjectCategory | 'all' }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Full Stack', value: 'fullstack' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'DevOps', value: 'devops' },
  ];
}
