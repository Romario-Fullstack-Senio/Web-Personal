import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public readonly scrolled = signal(false);
  public readonly menuOpen = signal(false);

  public readonly navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/experience', label: 'Experiencia' },
    { href: '/projects', label: 'Proyectos' },
    { href: '/skills', label: 'Skills' },
    { href: '/youtube', label: 'YouTube' },
    { href: '/certifications', label: 'Certificados' },
  ];

  @HostListener('window:scroll')
  public onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  public toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
