import { bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig)
  .then((ref) => {
    const router = ref.injector.get(Router);
    router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    });
  })
  .catch((err) => console.error(err));
