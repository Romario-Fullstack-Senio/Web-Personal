import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  public readonly __portfolioService = inject(PortfolioService);

  public get certifications() {
    return this.__portfolioService.certifications;
  }
  public get senaCertUrl() {
    return this.__portfolioService.senaCertUrl;
  }

  public getCategoryIcon(category: string): string {
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
