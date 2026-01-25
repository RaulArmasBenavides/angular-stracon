import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

export type CreateSupplierRequest = Omit<Supplier, 'id' | 'createdAt'>;

export type UpdateSupplierRequest = Partial<Pick<
  Supplier,
  'companyName' | 'contactName' | 'email' | 'phone' | 'isActive'
>>;

export type JsonPatchOp = {
  op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
  path: string;
  value?: any;
};

@Injectable({ providedIn: 'root' })
export class SuppliersService {
  private readonly http = inject(HttpClient);

  // Ajusta a tu backend real (ej: https://localhost:5001/api/suppliers)
  private readonly baseUrl = '/api/suppliers';

  // ======= GET =======
  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.baseUrl);
  }

  getSupplierById(id: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseUrl}/${encodeURIComponent(id)}`);
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
  createSupplier(payload: CreateSupplierRequest): Observable<Supplier> {
    return this.http.post<Supplier>(this.baseUrl, payload);
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
    return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(id)}`);
  }
}
