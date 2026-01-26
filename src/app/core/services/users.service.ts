import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
	private readonly http = inject(HttpClient);
	private readonly auth = inject(AuthService);
	private authHeaders(): HttpHeaders | undefined {
		const token = this.auth.getToken();
		return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
	}
	getUsers(): Observable<User[]> {
		const headers = this.authHeaders();

		if (!headers) {
			return throwError(() => new Error('No hay token de autenticación'));
		}

		return this.http.get<User[]>(`${environment.apiUrl}/users`, { headers }).pipe(
			map((response: any) => {
				// Si la respuesta tiene una estructura diferente, ajusta aquí
				// Ejemplo: si la respuesta es { data: [], message: 'success' }
				if (response.result && Array.isArray(response.result)) {
					return response.result;
				}
				return [];
			}),
			catchError((error: HttpErrorResponse) => {
				console.error('Error obteniendo usuarios:', error);
				return throwError(() => new Error(`Error al obtener usuarios: ${error.status} ${error.statusText}`));
			})
		);
	}

	// opcional: filtro simple por texto
	searchUsers(term: string): Observable<User[]> {
		const t = term.trim().toLowerCase();
		return this.getUsers().pipe(
			map((list) =>
				!t
					? list
					: list.filter(
							(x) =>
								x.fullName.toLowerCase().includes(t) ||
								x.email.toLowerCase().includes(t) ||
								x.role.toLowerCase().includes(t) ||
								x.status.toLowerCase().includes(t)
						)
			)
		);
	}
}
