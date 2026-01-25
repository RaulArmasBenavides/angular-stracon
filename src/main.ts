

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

fetch('/assets/env.json')
  .then(res => res.json())
  .then(env => {
    (globalThis as any).__env = env;
    return bootstrapApplication(AppComponent, appConfig);
  })
  .catch(err => console.error('Error cargando env.json', err));
