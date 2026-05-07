import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly router = inject(Router);

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

  public isActive(href: string): boolean {
    if (href === '/') return this.router.url === '/';
    return this.router.url.startsWith(href);
  }

  public addRipple(event: MouseEvent): void {
    const anchor = event.currentTarget as HTMLElement;
    const rect = anchor.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'nav-ripple';
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    anchor.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }
}
