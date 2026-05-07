import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  public readonly stack = [
    'Angular 21',
    'TypeScript',
    'NestJS',
    'Node.js',
    'PostgreSQL',
    'Docker',
    'GitHub Actions',
    'AWS',
  ];

  public readonly profileImageExists = signal(true);
  public readonly profileImageUrl = 'assets/images/profile.jpg';

  public readonly tiltX = signal(0);
  public readonly tiltY = signal(0);

  public onProfileImageError(): void {
    this.profileImageExists.set(false);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (event.clientX - rect.left - cx) / cx;
    const dy = (event.clientY - rect.top - cy) / cy;
    this.tiltX.set(-dy * 7);
    this.tiltY.set(dx * 7);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.tiltX.set(0);
    this.tiltY.set(0);
  }
}
