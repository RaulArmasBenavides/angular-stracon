import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export type CreateSupplierRequest = Omit<Supplier, 'id' | 'createdAt'>;

export type UpdateSupplierRequest = Partial<Pick<Supplier, 'name' | 'email' | 'phone' | 'isActive'>>;

export type JsonPatchOp = {
	op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
	path: string;
	value?: any;
};

@Injectable({ providedIn: 'root' })
export class SupplierService {
	private readonly http = inject(HttpClient);
	private readonly auth = inject(AuthService);
	private readonly baseUrl = '/api/suppliers';
	private authHeaders(): HttpHeaders | undefined {
		const token = this.auth.getToken();
		return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
	}
	// ======= GET =======
	getSuppliers(): Observable<Supplier[]> {
		return this.http.get<Supplier[]>(`${environment.apiUrl}/suppliers`, { headers: this.authHeaders() });
	}
	getSupplierById(id: string): Observable<Supplier> {
		const token = this.auth.getToken();

		const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
		return this.http.get<Supplier>(`${environment.apiUrl}/suppliers/${encodeURIComponent(id)}`, { headers });
	}

	// ======= SEARCH =======
	searchSuppliers(term: string): Observable<Supplier[]> {
		const q = (term ?? '').trim();
		if (!q) return this.getSuppliers();

		const params = new HttpParams().set('q', q);
		// Si tu API no tiene /search, cambia a this.baseUrl con params
		return this.http.get<Supplier[]>(`${this.baseUrl}/search`, { params });
	}

	// ======= POST (create) =======
	createSupplier(supplierData: CreateSupplierRequest): Observable<Supplier> {
		const formData = new FormData();

		// Agregar campos de texto
		formData.append('Name', supplierData.name);
		formData.append('Address', supplierData.address);
		formData.append('Phone', supplierData.phone);
		formData.append('Email', supplierData.email);

		if (supplierData.isApproved !== undefined) {
			formData.append('IsApproved', supplierData.isApproved.toString());
		}

		// Agregar archivo si existe
		if (supplierData.photo) {
			formData.append('Photo', supplierData.photo);
		}

		// NO configurar Content-Type - el navegador lo hace automáticamente con el boundary
		return this.http.post<Supplier>(`${environment.apiUrl}/suppliers`, formData, {
			headers: this.authHeaders()
		});
	}

	// ======= PATCH (partial update - simple DTO) =======
	// Recomendado si tu backend espera un "UpdateSupplierRequest" (campos opcionales)
	patchSupplier(id: string, changes: UpdateSupplierRequest): Observable<Supplier> {
		return this.http.patch<Supplier>(`${this.baseUrl}/${encodeURIComponent(id)}`, changes);
	}

	// ======= PATCH (JSON Patch RFC6902) =======
	// Úsalo SOLO si tu backend soporta JsonPatchDocument (ASP.NET)
	patchSupplierJsonPatch(id: string, patch: JsonPatchOp[]): Observable<Supplier> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json-patch+json' });
		return this.http.patch<Supplier>(`${this.baseUrl}/${encodeURIComponent(id)}`, patch, { headers });
	}

	// ======= PUT (full update - opcional) =======
	// Si tu backend usa PUT para reemplazo completo.
	updateSupplier(id: string, payload: Supplier): Observable<Supplier> {
		return this.http.put<Supplier>(`${this.baseUrl}/${encodeURIComponent(id)}`, payload);
	}

	// ======= DELETE =======
	deleteSupplier(id: string): Observable<void> {
	return this.http.delete<void>(
		`${environment.apiUrl}/suppliers/${encodeURIComponent(id)}`,
		{ headers: this.authHeaders() }
	);
	}

	uploadSupplierPhoto(id: string, file: File) {
		const form = new FormData();
		form.append('file', file);

		const headers = this.authHeaders(); // OJO: NO pongas Content-Type, el browser lo setea
		return this.http.post(`${environment.apiUrl}/suppliers/${id}/photo`, form, { headers });
	}
}
