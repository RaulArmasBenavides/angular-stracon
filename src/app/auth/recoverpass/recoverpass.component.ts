import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordCodeRequest } from 'src/app/core/models/auth/verifycode.request';
import { AuthService } from 'src/app/core/services/auth.service';
import { alertHelper } from 'src/app/helper/alert.helper';
import { passwordMatchValidator } from '../helper/password-strength.validator';
import { TuviheroComponent } from 'src/app/shared/components/tuvihero/tuvihero.component';

@Component({
	selector: 'app-recoverpass',
	templateUrl: './recoverpass.component.html',
	styleUrls: ['./recoverpass.component.css'],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, TuviheroComponent],
	standalone: true
})
export class RecoverpassComponent implements OnInit {
	_formPassword = new FormGroup(
		{
			accessCode: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
			c_password: new FormControl('', [Validators.required])
		},
		{ validators: passwordMatchValidator }
	);
	email: string = '';
	erroPassword: boolean = false;
	reset: boolean = false;
	message: string = '';
	back: boolean = false;
	expire_in: boolean = false;
	showPassword: boolean = false;
	showConfirmPassword: boolean = false;
	constructor(
		private readonly alert: alertHelper,
		private readonly loginService: AuthService,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly _fb: FormBuilder
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			this.email = params['email'] || '';
		});
	}

	resetPassword() {
		this._formPassword.markAllAsTouched();

		if (this._formPassword.invalid) {
			this.alert.notify('Por favor completa todos los campos correctamente', 'warning');
			return;
		}

		if (!this._formPassword.value.accessCode || !this._formPassword.value.password) {
			this.alert.notify('Todos los campos son requeridos', 'warning');
			return;
		}

		const request: ResetPasswordCodeRequest = {
			email: this.email,
			code: this._formPassword.value.accessCode.toString(),
			newPassword: this._formPassword.value.password // Ahora sabemos que no es null/undefined
		};
		if (!request.code) {
			this.alert.notify('El código de acceso es requerido', 'warning');
			return;
		}

		this.loginService.resetPassword(request).subscribe({
			next: () => {
				this.alert.notify('Se cambió la contraseña exitosamente', 'success');
				this.router.navigate(['/login']);
			},
			error: (err) => {
				console.error('Error al resetear contraseña:', err);
				this.alert.notify('Ocurrió un error al cambiar la contraseña', 'warning');
			}
		});
	}

	toggleShowPassword() {
		this.showPassword = !this.showPassword;
	}

	toggleShowConfirmPassword() {
		this.showConfirmPassword = !this.showConfirmPassword;
	}

	private stringToDate(_date: any) {
		return new Date(_date);
	}

	back_form() {
		// this._user = new User();
		this.reset = false;
	}
}
