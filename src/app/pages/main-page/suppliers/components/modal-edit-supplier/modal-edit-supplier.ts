import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Supplier } from 'src/app/core/models/supplier.model';
import { SupplierService } from 'src/app/core/services/suppliers.service';
declare const $: any;
@Component({
	selector: 'app-modal-edit-supplier',
	imports: [CommonModule, RouterModule, ReactiveFormsModule],
	templateUrl: './modal-edit-supplier.html',
	styleUrl: './modal-edit-supplier.css'
})
export class ModalEditSupplier {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly suppliers = inject(SupplierService);

	supplier$!: Observable<Supplier>;
	isApproving: boolean = false;
	isUploading: boolean = false;
	selectedFile: File | null = null;
	previewUrl: string | null = null;
	ngOnInit(): void {
		this.supplier$ = this.route.paramMap.pipe(switchMap((p) => this.suppliers.getSupplierById(p.get('id')!)));
	}

	back(): void {
		this.router.navigate(['/main/suppliers']);
	}

	getPhotoUrl(s: Supplier): string {
		// Placeholder
		if (!s.photo) return 'assets/img/template/no-image.png';
		// if (s.photo.startsWith('http')) return s.photo;
		return 'assets/img/template/no-image.png';
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0] ?? null;

		this.selectedFile = file;
		this.previewUrl = file ? URL.createObjectURL(file) : null;
	}

	approve() {}

	uploadPhoto(id: string) {}
}
