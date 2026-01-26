import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/module.d-CnjH8Dlt';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
	private readonly users: User[] = [
		{ id: 1, fullName: 'Ana Torres', email: 'ana@demo.com', role: 'Admin', status: 'Active', createdAt: '2025-12-12' },
		{ id: 2, fullName: 'Luis Ramos', email: 'luis@demo.com', role: 'User', status: 'Active', createdAt: '2025-11-02' },
		{ id: 3, fullName: 'Carla Vega', email: 'carla@demo.com', role: 'Support', status: 'Inactive', createdAt: '2025-10-18' },
		{ id: 4, fullName: 'Mario Paredes', email: 'mario@demo.com', role: 'User', status: 'Active', createdAt: '2026-01-05' }
	];
	private readonly http = inject(HttpClient);
	private readonly auth = inject(AuthService);
	private authHeaders(): HttpHeaders | undefined {
		const token = this.auth.getToken();
		return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
	}
	getUsers(): Observable<User[]> {
		// delay para simular llamada HTTP
		return of(this.users).pipe(delay(250));
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
