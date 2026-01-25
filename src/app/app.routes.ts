import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RecoverpassComponent } from './auth/recoverpass/recoverpass.component';
import { RegisterComponent } from './auth/register/register.component';
import { GuardsRouteMainService } from './core/guards/mainservice.guard';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuardsRouteMainService]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'recoverpass',
    component: RecoverpassComponent
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },

  { path: '**', redirectTo: '' }
];
