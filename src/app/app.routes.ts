import { Routes } from '@angular/router';

import { GuardsRouteMainService } from './core/guards/guards-route-main.service';

export const routes: Routes = [
  {
    path: '',
    canActivate: [GuardsRouteMainService],
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then((c) => c.LoginComponent)
  },
  { path: '**', redirectTo: '' }
];
