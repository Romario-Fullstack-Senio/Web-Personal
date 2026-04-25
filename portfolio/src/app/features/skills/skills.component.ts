import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionTitleComponent],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  readonly service = inject(PortfolioService);

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      Frontend: '💻',
      Backend: '⚙️',
      Database: '🗄️',
      DevOps: '🚀',
      Tools: '🛠️',
    };
    return icons[category] || '📌';
  }
}
