import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  readonly stack = [
    'Angular 21',
    'TypeScript',
    'NestJS',
    'Node.js',
    'PostgreSQL',
    'Docker',
    'GitHub Actions',
    'AWS',
  ];

  readonly profileImageExists = signal(true);
  readonly profileImageUrl = 'assets/images/profile.jpg';

  public onProfileImageError(): void {
    this.profileImageExists.set(false);
  }
}
