import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { AlertHelper } from 'src/app/helper/alert.helper';

@Component({
	selector: 'app-modal-create-user',
	imports: [CommonModule, RouterModule, ReactiveFormsModule],
	templateUrl: './modal-create-user.component.html',
	styleUrl: './modal-create-user.component.css'
})
export class ModalCreateUserComponent {
	userForm: FormGroup;
	showPassword = false;
	showConfirmPassword = false;
	isSubmitting = false;
	selectedFile: File | null = null;
	isUploading = false;
	private readonly alert = inject(AlertHelper);
	private readonly usersService = inject(UsersService);
	constructor(
		private fb: FormBuilder,
		private router: Router
	) {
		this.userForm = this.fb.group(
			{
				userName: ['', [Validators.required, Validators.minLength(3)]],
				email: ['', [Validators.required, Validators.email]],
				password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]],
				confirmPassword: ['', Validators.required],
				role: ['', Validators.required],
				firstName: [''],
				lastName: [''],
				phone: ['']
			},
			{ validators: this.passwordMatchValidator() }
		);
	}

	ngOnInit(): void {}

	private passwordValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			const value = control.value;
			if (!value) {
				return null;
			}

			const hasUpperCase = /[A-Z]/.test(value);
			const hasLowerCase = /[a-z]/.test(value);
			const hasNumeric = /[0-9]/.test(value);
			const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

			const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

			return !passwordValid ? { pattern: true } : null;
		};
	}

	private passwordMatchValidator(): ValidatorFn {
		return (formGroup: AbstractControl): { [key: string]: any } | null => {
			const password = formGroup.get('password')?.value;
			const confirmPassword = formGroup.get('confirmPassword')?.value;

			if (password !== confirmPassword) {
				formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
				return { passwordMismatch: true };
			} else {
				formGroup.get('confirmPassword')?.setErrors(null);
				return null;
			}
		};
	}

	onSubmit(): void {
		if (this.userForm.invalid) {
			this.markFormGroupTouched(this.userForm);
			return;
		}

		this.isSubmitting = true;

		// Preparar los datos para enviar (excluir confirmPassword)
		const formData = {
			userName: this.userForm.get('userName')?.value,
			email: this.userForm.get('email')?.value,
			password: this.userForm.get('password')?.value,
			role: this.userForm.get('role')?.value
		};

		// Agregar campos opcionales si existen
		const firstName = this.userForm.get('firstName')?.value;
		const lastName = this.userForm.get('lastName')?.value;
		const phone = this.userForm.get('phone')?.value;

		const userData: any = { ...formData };
		if (firstName) userData.firstName = firstName;
		if (lastName) userData.lastName = lastName;
		if (phone) userData.phone = phone;

		// Usar el servicio para crear el usuario
		this.usersService
			.createUser(userData)
			.pipe(
				finalize(() => {
					this.isSubmitting = false;
				})
			)
			.subscribe({
				next: (response) => {
					console.log('Usuario creado exitosamente:', response);

					// Mostrar mensaje de éxito
					this.alert.notify('Usuario creado exitosamente');

					// Redirigir a la lista de usuarios
					this.router.navigate(['/main/users']);
				},
				error: (error) => {
					console.error('Error al crear usuario:', error);

					// Mostrar mensaje de error específico
					let errorMessage = 'Error al crear usuario';
					if (error.message) {
						errorMessage = error.message;
					}

					this.alert.notifyError(errorMessage);
				}
			});
	}

	onFileSelected(event: any): void {
		const file = event.target.files[0];
		if (file) {
			if (!file.type.match('image.*')) {
				this.alert.notifyError('Por favor seleccione una imagen válida');
				return;
			}

			if (file.size > 5 * 1024 * 1024) {
				this.alert.notifyError('La imagen no debe superar los 5MB');
				return;
			}

			this.selectedFile = file;
		}
	}

	back(): void {
		this.router.navigate(['/main/users']);
	}

	private markFormGroupTouched(formGroup: FormGroup): void {
		Object.values(formGroup.controls).forEach((control) => {
			control.markAsTouched();
			if (control instanceof FormGroup) {
				this.markFormGroupTouched(control);
			}
		});
	}

	get f() {
		return this.userForm.controls;
	}
}
