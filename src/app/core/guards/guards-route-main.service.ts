import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GuardsRouteMainService implements CanActivate {
  private readonly TOKEN_KEY = 'stracon_token';

  constructor(
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  canActivate(): boolean | UrlTree {
    // En SSR: no hay localStorage. Decide política:
    // - permitir para que SSR renderice (y el client re-valida)
    // - o bloquear siempre en SSR (no recomendado)
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    const token =
      localStorage.getItem(this.TOKEN_KEY) ?? sessionStorage.getItem(this.TOKEN_KEY);

    if (token && token.trim().length > 0) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}
