import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Supplier } from 'src/app/core/models/supplier.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { SupplierService } from 'src/app/core/services/suppliers.service';
import { AlertHelper } from 'src/app/helper/alert.helper';
declare const $: any;
@Component({
	selector: 'app-modal-edit-supplier',
	imports: [CommonModule, RouterModule, ReactiveFormsModule],
	templateUrl: './modal-edit-supplier.html',
	styleUrl: './modal-edit-supplier.css'
})
export class ModalEditSupplier implements OnInit {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly suppliers = inject(SupplierService);
	private readonly alert = inject(AlertHelper);
	readonly auth = inject(AuthService);
	supplier$!: Observable<Supplier>;
	isApproving: boolean = false;
	isUploading: boolean = false;
	selectedFile: File | null = null;
	previewUrl: string | null = null;
	rol: string = '';
	isApprover: boolean = false;
	ngOnInit(): void {
		this.rol = this.auth.getCurrentUser()?.role ?? 'Requester';
		this.isApprover = this.rol == 'Approver';
		this.supplier$ = this.route.paramMap.pipe(switchMap((p) => this.suppliers.getSupplierById(p.get('id')!)));
	}

	back(): void {
		this.router.navigate(['/main/suppliers']);
	}

	getPhotoUrl(supplier: any): string {
		if (!supplier?.photo) {
			return '/assets/img/default-supplier.png'; // Imagen por defecto
		}

		return supplier.photo;
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0] ?? null;

		this.selectedFile = file;
		this.previewUrl = file ? URL.createObjectURL(file) : null;
	}

	approve(): void {
		if (this.isApproving) return;

		this.isApproving = true;

		this.supplier$.subscribe({
			next: (s) => {
				this.suppliers.approveSupplier(s.id).subscribe({
					next: () => {
						// refrescar data
						this.supplier$ = this.suppliers.getSupplierById(s.id);
						this.isApproving = false;
						this.alert.notify('Se aprobó los datos del proveedor');
					},
					error: (err) => {
						console.error('Error approving supplier', err);
						this.isApproving = false;
						this.alert.notifyError('No se pudo aprobar el proveedor');
					}
				});
			}
		});
	}

	uploadPhoto(id: string) {}
}
