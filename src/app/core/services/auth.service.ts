// src/app/core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthUser, LoginRequest, LoginResponse } from '../models/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly TOKEN_KEY = 'stracon_token';
  private readonly USER_KEY = 'stracon_user';

  private readonly userSubject = new BehaviorSubject<AuthUser | null>(this.readUser());
  readonly user$ = this.userSubject.asObservable();

  login(payload: LoginRequest): Observable<LoginResponse> {
    // API: /api/v1/login
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, payload).pipe(
      tap((res) => {
        this.persistSession(res, !!payload.remember);
        this.userSubject.next(res.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) ?? sessionStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ---------- helpers ----------
  private persistSession(res: LoginResponse, remember: boolean): void {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem(this.TOKEN_KEY, res.access_token);
    storage.setItem(this.USER_KEY, JSON.stringify(res.user));
  }

  private readUser(): AuthUser | null {
    const raw = localStorage.getItem(this.USER_KEY) ?? sessionStorage.getItem(this.USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
