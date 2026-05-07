import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

@Component({
  selector: 'app-neural-network',
  standalone: true,
  template: '<canvas #canvas class="neural-canvas"></canvas>',
})
export class NeuralNetworkComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private rafId: number | null = null;
  private neurons: Neuron[] = [];
  private pulses: Pulse[] = [];
  private lastPulseTime = 0;

  private readonly NODE_COUNT = 65;
  private readonly MAX_DIST = 160;
  private readonly PULSE_INTERVAL = 500;

  private readonly onResize = (): void => {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.initNeurons(canvas);
  };

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.initNeurons(canvas);
    window.addEventListener('resize', this.onResize, { passive: true });
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onResize);
    }
  }

  private initNeurons(canvas: HTMLCanvasElement): void {
    this.neurons = Array.from({ length: this.NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      radius: Math.random() * 1.6 + 1.1,
    }));
    this.pulses = [];
  }

  private animate(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const now = performance.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update neuron positions
    for (const n of this.neurons) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    }

    // Draw connections between close neurons
    for (let i = 0; i < this.neurons.length; i++) {
      for (let j = i + 1; j < this.neurons.length; j++) {
        const a = this.neurons[i];
        const b = this.neurons[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.MAX_DIST) {
          const alpha = (1 - dist / this.MAX_DIST) * 0.22;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(37,99,235,${alpha})`);
          grad.addColorStop(1, `rgba(34,211,238,${alpha})`);
          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.75;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Schedule new pulses
    if (now - this.lastPulseTime > this.PULSE_INTERVAL && this.pulses.length < 20) {
      const from = Math.floor(Math.random() * this.neurons.length);
      let best = -1;
      let bestDist = Infinity;
      for (let i = 0; i < this.neurons.length; i++) {
        if (i === from) continue;
        const dx = this.neurons[i].x - this.neurons[from].x;
        const dy = this.neurons[i].y - this.neurons[from].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < this.MAX_DIST && d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      if (best !== -1) {
        this.pulses.push({
          fromIdx: from,
          toIdx: best,
          progress: 0,
          speed: 0.007 + Math.random() * 0.013,
        });
        this.lastPulseTime = now;
      }
    }

    // Draw and advance pulses (idea rays)
    this.pulses = this.pulses.filter((p) => {
      p.progress += p.speed;
      if (p.progress >= 1) return false;

      const a = this.neurons[p.fromIdx];
      const b = this.neurons[p.toIdx];
      const px = a.x + (b.x - a.x) * p.progress;
      const py = a.y + (b.y - a.y) * p.progress;

      // Pulse glow
      const pg = ctx.createRadialGradient(px, py, 0, px, py, 7);
      pg.addColorStop(0, 'rgba(34,211,238,0.98)');
      pg.addColorStop(0.35, 'rgba(34,211,238,0.4)');
      pg.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.beginPath();
      ctx.fillStyle = pg;
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();

      // Trailing tail
      const tx = px - (b.x - a.x) * 0.08;
      const ty = py - (b.y - a.y) * 0.08;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(37,99,235,0.35)';
      ctx.lineWidth = 1.5;
      ctx.moveTo(tx, ty);
      ctx.lineTo(px, py);
      ctx.stroke();

      return true;
    });

    // Draw neurons
    for (const n of this.neurons) {
      // Outer glow
      const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 4);
      ng.addColorStop(0, 'rgba(37,99,235,0.75)');
      ng.addColorStop(0.5, 'rgba(37,99,235,0.2)');
      ng.addColorStop(1, 'rgba(37,99,235,0)');
      ctx.beginPath();
      ctx.fillStyle = ng;
      ctx.arc(n.x, n.y, n.radius * 4, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.fillStyle = 'rgba(34,211,238,0.8)';
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    this.rafId = requestAnimationFrame(() => this.animate());
  }
}
