import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SupplierService } from 'src/app/core/services/suppliers.service';
import { AlertHelper } from 'src/app/helper/alert.helper';

@Component({
	selector: 'app-modal-create-supplier',
	imports: [RouterModule, ReactiveFormsModule],
	templateUrl: './modal-create-supplier.html',
	styleUrl: './modal-create-supplier.css'
})
export class ModalCreateSupplier {
	private readonly fb = inject(FormBuilder);
	private readonly router = inject(Router);
	private readonly supplierService = inject(SupplierService);
	private readonly notificationService = inject(AlertHelper);

	supplierForm!: FormGroup;
	isSubmitting = false;
	selectedFile: File | null = null;
	previewUrl: string | null = null;

	// Validación de tipos de imagen
	readonly allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
	readonly maxFileSize = 5 * 1024 * 1024; // 5MB

	ngOnInit(): void {
		this.initForm();
	}

	private initForm(): void {
		this.supplierForm = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
			address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
			phone: ['', [Validators.required, Validators.pattern(/^[0-9+()\-\s]+$/)]],
			email: ['', [Validators.required, Validators.email]],
			isApproved: [false]
		});
	}

	// Manejar selección de archivo
	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0] || null;

		if (!file) {
			this.selectedFile = null;
			this.previewUrl = null;
			return;
		}

		// Validar tipo de archivo
		if (!this.allowedImageTypes.includes(file.type)) {
			// this.notificationService.showError('Formato de imagen no válido. Use JPG, PNG, GIF, WebP o BMP.');
			input.value = '';
			return;
		}

		// Validar tamaño
		if (file.size > this.maxFileSize) {
			// this.notificationService.showError('La imagen es demasiado grande. Máximo 5MB.');
			input.value = '';
			return;
		}

		this.selectedFile = file;

		// Crear preview
		const reader = new FileReader();
		reader.onload = () => {
			this.previewUrl = reader.result as string;
		};
		reader.readAsDataURL(file);
	}

	// Remover foto seleccionada
	removePhoto(): void {
		this.selectedFile = null;
		this.previewUrl = null;
	}

	// Obtener URL de preview o placeholder
	getPhotoUrl(): string {
		if (this.previewUrl) {
			return this.previewUrl;
		}
		return 'assets/img/default-supplier.png';
	}

	// Enviar formulario
	onSubmit(): void {
		if (this.supplierForm.invalid || this.isSubmitting) {
			this.markFormGroupTouched(this.supplierForm);
			return;
		}

		this.isSubmitting = true;

		const formValue = this.supplierForm.value;
		const supplierData = {
			name: formValue.name,
			address: formValue.address,
			phone: formValue.phone,
			email: formValue.email,
			isApproved: formValue.isApproved,
			photo: this.selectedFile || undefined
		};

		this.supplierService.createSupplier(supplierData).subscribe({
			next: (supplier) => {
				// this.notificationService.showSuccess('Proveedor creado exitosamente');
				this.router.navigate(['/main/suppliers']);
			},
			error: (error) => {
				console.error('Error al crear proveedor:', error);

				let errorMessage = 'Error al crear el proveedor';
				if (error.status === 400) {
					errorMessage = error.error?.message || 'Datos inválidos. Verifique los campos.';
				} else if (error.status === 401 || error.status === 403) {
					errorMessage = 'No tiene permisos para crear proveedores';
				} else if (error.status === 422) {
					errorMessage =
						'Error de validación: ' +
						(Array.isArray(error.error?.detail)
							? error.error.detail.map((e: any) => e.msg).join(', ')
							: error.error?.detail || 'Campos requeridos faltantes');
				}

				this.notificationService.notifyError(errorMessage);
				this.isSubmitting = false;
			},
			complete: () => {
				this.isSubmitting = false;
			}
		});
	}

	// Cancelar y volver
	onCancel(): void {
		if (this.supplierForm.dirty && !confirm('¿Está seguro de salir? Los cambios no guardados se perderán.')) {
			return;
		}
		this.router.navigate(['/main/suppliers']);
	}

	// Marcar todos los campos como tocados para mostrar errores
	private markFormGroupTouched(formGroup: FormGroup): void {
		Object.values(formGroup.controls).forEach((control) => {
			control.markAsTouched();
			if (control instanceof FormGroup) {
				this.markFormGroupTouched(control);
			}
		});
	}

	// Helper para mostrar errores en el template
	getFieldError(fieldName: string): string | null {
		const field = this.supplierForm.get(fieldName);

		if (!field || !field.errors || !field.touched) {
			return null;
		}

		if (field.errors['required']) {
			return 'Este campo es requerido';
		}

		if (field.errors['email']) {
			return 'Email inválido';
		}

		if (field.errors['minlength']) {
			return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
		}

		if (field.errors['maxlength']) {
			return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
		}

		if (field.errors['pattern']) {
			return 'Formato inválido';
		}

		return 'Campo inválido';
	}
}
