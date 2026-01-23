import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  standalone: false,
})
export class CategoriesComponent implements OnInit {
 private readonly categoriesService = inject(CategoriesService);

  categories$!: Observable<Category[]>;
  term = '';

  // UI: expand/collapse por categoría
  expanded = new Set<number>();

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getCategories();
  }

  onSearch(): void {
    this.categories$ = this.categoriesService.searchCategories(this.term);
  }

  toggle(id: number): void {
    this.expanded.has(id) ? this.expanded.delete(id) : this.expanded.add(id);
  }

  isExpanded(id: number): boolean {
    return this.expanded.has(id);
  }
}
