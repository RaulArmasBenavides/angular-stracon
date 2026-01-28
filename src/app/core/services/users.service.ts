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
								x.userName.toLowerCase().includes(t) ||
								x.email.toLowerCase().includes(t) ||
								x.role.toLowerCase().includes(t) ||
								x.status.toLowerCase().includes(t)
						)
			)
		);
	}

	createUser(userData: { userName: string; email: string; password: string; role: string }): Observable<any> {
		const headers = this.authHeaders();

		if (!headers) {
			return throwError(() => new Error('No hay token de autenticación'));
		}

		// Configurar headers para JSON
		const jsonHeaders = headers.set('Content-Type', 'application/json');

		return this.http
			.post(`${environment.apiUrl}/users`, userData, {
				headers: jsonHeaders,
				observe: 'response' // Para obtener toda la respuesta, incluyendo headers
			})
			.pipe(
				map((response: any) => {
					// Procesar la respuesta según la estructura de tu API
					console.log('Respuesta completa:', response);

					if (response.status === 201 || response.status === 200) {
						// Si tu API devuelve los datos en un campo específico (como 'result')
						if (response.body?.result) {
							return response.body.result;
						}
						// Si devuelve directamente el objeto usuario
						if (response.body) {
							return response.body;
						}
						// Si solo necesitas confirmación
						return { success: true, message: 'Usuario creado exitosamente' };
					}

					throw new Error('Respuesta inesperada del servidor');
				}),
				catchError((error: HttpErrorResponse) => {
					console.error('Error creando usuario:', error);

					let errorMessage = 'Error al crear usuario';

					if (error.status === 400) {
						errorMessage = 'Datos inválidos. Verifique la información ingresada';
					} else if (error.status === 409) {
						errorMessage = 'El nombre de usuario o email ya existe';
					} else if (error.status === 401) {
						errorMessage = 'No autorizado. Por favor inicie sesión nuevamente';
					} else if (error.status === 403) {
						errorMessage = 'No tiene permisos para crear usuarios';
					} else if (error.error?.message) {
						errorMessage = error.error.message;
					} else if (error.error?.errors) {
						// Si hay errores de validación específicos
						const validationErrors = error.error.errors;
						errorMessage =
							'Errores de validación: ' +
							Object.keys(validationErrors)
								.map((key) => `${key}: ${validationErrors[key]}`)
								.join(', ');
					}

					return throwError(() => new Error(errorMessage));
				})
			);
	}
}
