import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly data: Category[] = [
    {
      id: 1,
      name: 'Electrónica',
      description: 'Gadgets, audio, computación',
      isActive: true,
      createdAt: '2025-12-10',
      subcategories: [
        { id: 101, name: 'Celulares', isActive: true, createdAt: '2025-12-11' },
        { id: 102, name: 'Laptops', isActive: true, createdAt: '2025-12-11' },
        { id: 103, name: 'Audio', isActive: false, createdAt: '2025-12-12' },
      ],
    },
    {
      id: 2,
      name: 'Ropa',
      description: 'Moda y accesorios',
      isActive: true,
      createdAt: '2025-11-05',
      subcategories: [
        { id: 201, name: 'Hombre', isActive: true, createdAt: '2025-11-06' },
        { id: 202, name: 'Mujer', isActive: true, createdAt: '2025-11-06' },
        { id: 203, name: 'Accesorios', isActive: true, createdAt: '2025-11-06' },
      ],
    },
    {
      id: 3,
      name: 'Hogar',
      description: 'Casa y cocina',
      isActive: false,
      createdAt: '2025-10-01',
      subcategories: [
        { id: 301, name: 'Cocina', isActive: true, createdAt: '2025-10-02' },
        { id: 302, name: 'Decoración', isActive: true, createdAt: '2025-10-02' },
      ],
    },
  ];

  getCategories(): Observable<Category[]> {
    return of(this.data).pipe(delay(250));
  }

  searchCategories(term: string): Observable<Category[]> {
    const t = term.trim().toLowerCase();
    return this.getCategories().pipe(
      map(list =>
        !t
          ? list
          : list.filter(c =>
              c.name.toLowerCase().includes(t) ||
              (c.description ?? '').toLowerCase().includes(t) ||
              c.subcategories.some(s => s.name.toLowerCase().includes(t))
            )
      )
    );
  }

  // Para dashboard/charts
  getSubcategoryCountByCategory(): Observable<{ label: string; value: number }[]> {
    return this.getCategories().pipe(
      map(list => list.map(c => ({ label: c.name, value: c.subcategories.length })))
    );
  }
}
