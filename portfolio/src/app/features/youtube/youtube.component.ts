import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Course {
  title: string;
  description: string;
  videoId: string;
}

@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './youtube.component.html',
  styleUrl: './youtube.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubeComponent {
  public readonly channelUrl = 'https://www.youtube.com/@RomarioFullstackSenior';
  public readonly courses: Course[] = [
    {
      title: 'Curso Angular Básico',
      description: 'Aprende Angular desde cero con ejemplos prácticos.',
      videoId: 'Bf7hfpItrDk',
    },
    {
      title: 'Curso Node.js Express',
      description: 'Crea APIs robustas con Node.js y Express.',
      videoId: 'jjSaUeqJi4s',
    },
  ];

  constructor(private readonly sanitizer: DomSanitizer) {}

  public getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + videoId,
    );
  }
}
