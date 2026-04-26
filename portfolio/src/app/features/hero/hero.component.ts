import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

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

  public onProfileImageError(): void {
    this.profileImageExists.set(false);
  }
}
