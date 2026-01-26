import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { Supplier } from 'src/app/core/models/supplier.model';
import { SupplierService } from 'src/app/core/services/suppliers.service';
import { ModalEditSupplier } from './components/modal-edit-supplier/modal-edit-supplier';

@Component({
	selector: 'app-suppliers',
	imports: [CommonModule, RouterModule],
	templateUrl: './suppliers.html',
	styleUrl: './suppliers.css'
})
export class Suppliers {
	private readonly supplierService = inject(SupplierService);
	private readonly router = inject(Router);
	suppliers$!: Observable<Supplier[]>;
	searchTerm = '';

	ngOnInit(): void {
		this.load();
	}

	load(): void {
		this.suppliers$ = this.supplierService.getSuppliers().pipe(startWith([] as Supplier[]));
	}

	onSearch(): void {
		const term = this.searchTerm.trim().toLowerCase();
		this.suppliers$ = this.supplierService.getSuppliers().pipe(
			map((list) =>
				!term
					? list
					: list.filter((s) =>
							[s.name, s.email, s.phone, s.address, s.createdBy ?? '', s.approvedBy ?? ''].join(' ').toLowerCase().includes(term)
						)
			),
			startWith([] as Supplier[])
		);
	}

	onEdit(s: Supplier): void {
		this.router.navigate(['/main/suppliers', s.id, 'edit']);
	}

	onDelete(s: Supplier): void {
	this.supplierService.deleteSupplier(s.id).subscribe({
		next: () => {
		this.load(); // recarga la lista
		},
		error: (err) => {
		console.error('Error al eliminar proveedor', err);
		}
	});
	}
	onCreate() {
		this.router.navigate(['/main/suppliers', 'create']);
	}
}
