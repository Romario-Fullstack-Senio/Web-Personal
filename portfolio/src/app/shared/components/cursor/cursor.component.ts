import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cursor',
  standalone: true,
  templateUrl: './cursor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dot') private dotRef!: ElementRef<HTMLDivElement>;
  @ViewChild('aura') private auraRef!: ElementRef<HTMLDivElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  public readonly isBrowser = isPlatformBrowser(this.platformId);
  public readonly showCursor = signal(false);
  public readonly isHovering = signal(false);

  private targetX = 0;
  private targetY = 0;
  private auraX = 0;
  private auraY = 0;
  private rafId: number | null = null;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    this.showCursor.set(true);
    document.body.classList.add('has-custom-cursor');
    this.ngZone.runOutsideAngular(() => this.startAuraLoop());
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    if (this.isBrowser) document.body.classList.remove('has-custom-cursor');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser) return;
    this.targetX = event.clientX;
    this.targetY = event.clientY;

    if (this.dotRef?.nativeElement) {
      this.dotRef.nativeElement.style.left = `${event.clientX}px`;
      this.dotRef.nativeElement.style.top = `${event.clientY}px`;
    }

    const el = event.target as HTMLElement;
    const hovering = !!el.closest('a, button, [role="button"]');
    if (hovering !== this.isHovering()) {
      this.ngZone.run(() => this.isHovering.set(hovering));
    }
  }

  @HostListener('document:mousedown')
  onMouseDown(): void {
    this.dotRef?.nativeElement?.classList.add('clicking');
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.dotRef?.nativeElement?.classList.remove('clicking');
  }

  private startAuraLoop(): void {
    const animate = () => {
      this.auraX += (this.targetX - this.auraX) * 0.14;
      this.auraY += (this.targetY - this.auraY) * 0.14;
      if (this.auraRef?.nativeElement) {
        this.auraRef.nativeElement.style.left = `${this.auraX}px`;
        this.auraRef.nativeElement.style.top = `${this.auraY}px`;
      }
      this.rafId = requestAnimationFrame(animate);
    };
    animate();
  }
}
