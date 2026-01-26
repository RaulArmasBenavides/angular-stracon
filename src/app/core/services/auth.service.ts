// src/app/core/services/auth.service.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthUser, LoginRequest, LoginResponse } from '../models/auth.model';
import { environment } from 'src/environments/environment';

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const noopStorage: StorageLike = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly TOKEN_KEY = 'stracon_token';
  private readonly USER_KEY = 'stracon_user';

  private readonly userSubject = new BehaviorSubject<AuthUser | null>(this.readUser());
  readonly user$ = this.userSubject.asObservable();

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, payload).pipe(
      tap((res) => {
        this.persistSession(res, !!payload.remember);
        this.userSubject.next(res.user);
      })
    );
  }

  logout(): void {
    const ls = this.localStorageSafe();
    const ss = this.sessionStorageSafe();

    ls.removeItem(this.TOKEN_KEY);
    ls.removeItem(this.USER_KEY);
    ss.removeItem(this.TOKEN_KEY);
    ss.removeItem(this.USER_KEY);

    this.userSubject.next(null);
  }

  getToken(): string | null {
    const ls = this.localStorageSafe();
    const ss = this.sessionStorageSafe();
    return ls.getItem(this.TOKEN_KEY) ?? ss.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ---------- helpers ----------
  private persistSession(res: LoginResponse, remember: boolean): void {
    const storage = remember ? this.localStorageSafe() : this.sessionStorageSafe();
    storage.setItem(this.TOKEN_KEY, res.access_token);
    storage.setItem(this.USER_KEY, JSON.stringify(res.user));
  }

  private readUser(): AuthUser | null {
    const ls = this.localStorageSafe();
    const ss = this.sessionStorageSafe();

    const raw = ls.getItem(this.USER_KEY) ?? ss.getItem(this.USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private localStorageSafe(): StorageLike {
    return this.isBrowser() ? window.localStorage : noopStorage;
  }

  private sessionStorageSafe(): StorageLike {
    return this.isBrowser() ? window.sessionStorage : noopStorage;
  }
}
