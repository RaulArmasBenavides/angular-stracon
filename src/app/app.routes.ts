import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { GuardsRouteMainService } from './core/guards/guards-route-main.service';

export const routes: Routes = [
	// Default -> manda a main
	{ path: '', pathMatch: 'full', redirectTo: 'main' },

	// Main protegido
	{
		path: 'main',
		canActivate: [GuardsRouteMainService],
		loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule)
	},

	// Login público
	{ path: 'login', component: LoginComponent },

	// Wildcard -> manda a main (o login si prefieres)
	{ path: '**', redirectTo: 'main' }
];
