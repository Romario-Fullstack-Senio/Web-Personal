import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SectionTitleComponent],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  readonly service = inject(PortfolioService);
}
