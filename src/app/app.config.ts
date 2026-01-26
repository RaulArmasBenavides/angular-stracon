import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
// import { MaterialModule } from './shared/material/material.module';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			routes,
			// 👇 Esto hace que al entrar a una nueva ruta suba al top y soporte #anclas
			withInMemoryScrolling({
				scrollPositionRestoration: 'enabled',
				anchorScrolling: 'enabled'
			}),
			withViewTransitions() // opcional: transiciones suaves entre vistas
		),
		provideHttpClient(withFetch(), withInterceptors([httpErrorInterceptor])),
		provideAnimations(), // puedes cambiar por provideAnimationsAsync() si prefieres carga diferida
	]
};
