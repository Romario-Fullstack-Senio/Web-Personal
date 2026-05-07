import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('skillsSection') private sectionRef!: ElementRef<HTMLElement>;

  public readonly __portfolioService = inject(PortfolioService);
  public readonly animationTriggered = signal(false);

  private observer: IntersectionObserver | null = null;

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

  public getBarDelay(groupIndex: number, skillIndex: number): string {
    return `${(groupIndex * 4 + skillIndex) * 90}ms`;
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.animationTriggered()) {
          this.animationTriggered.set(true);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (this.sectionRef?.nativeElement) {
      this.observer.observe(this.sectionRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
