import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { matchFieldsValidator, passwordStrengthValidator } from '../helper/password-strength.validator';
import { CommonModule } from '@angular/common';
import { TuviheroComponent } from 'src/app/shared/components/tuvihero/tuvihero.component';
import { RegisterUserForm, ValidateUserForm } from 'src/app/core/models/auth/login-form.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { alertHelper } from 'src/app/helper/alert.helper';
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	imports: [CommonModule, FormsModule, ReactiveFormsModule,TuviheroComponent],
	standalone: true
})
export class RegisterComponent implements OnInit {
	showFullForm: boolean = false;
	showPassword: boolean = false;
	showPassword2: boolean = false;

	constructor(
		private readonly router: Router,
		private readonly alert: alertHelper,
		private readonly loginService: AuthService,
		private readonly fb: FormBuilder
	) {}
	emailForm = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email])
	});
	registerForm!: FormGroup;

	ngOnInit(): void {
		this.registerForm = this.fb.group(
			{
				nombre: ['', [Validators.required, Validators.maxLength(100)]],
				email: [''],
				password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), passwordStrengthValidator()]],
				password2: ['', [Validators.required]],
				code: ['', [Validators.required]],
				terminos: [false, [Validators.requiredTrue]]
			},
			{ validators: [matchFieldsValidator('password', 'password2')] }
		);
	}

	validate() {
		if (this.emailForm.invalid) {
			this.emailForm.markAllAsTouched();
			return;
		}

		this.loginService.validate(this.getEmailForm()).subscribe(
			(resp: any) => {
				this.showFullForm = true;
				this.registerForm.get('email')?.setValue(this.emailForm.value.email!);
			},
			(err) => {
				this.alert.notify('El correo ya está registrado o no es válido', 'warning');
			}
		);
	}

	register() {
		if (this.registerForm.invalid || this.contrasenasNoValidas()) {
			this.alert.notify('Error al registrar usuario', 'warning');
			this.registerForm.markAllAsTouched();
			return;
		}

		this.loginService.register(this.getRegisterForm()).subscribe(
			(resp: any) => {
				this.alert.notify('Usuario registrado correctamente', 'success');
				this.router.navigate(['/login']);
			},
			(err) => {
				this.alert.notify('Error al registrar usuario', 'warning');
			}
		);
	}

	goLogin() {
		this.router.navigate(['/auth/login']); // ajusta la ruta real
	}

	getEmailForm(): ValidateUserForm {
		const { email } = this.emailForm.value;
		return { email: email ?? '' };
	}

	getRegisterForm(): RegisterUserForm {
		const { email, password, code, nombre } = this.registerForm.value;
		return {
			email: email ?? '',
			password: password ?? '',
			code: code ?? '',
			nombre: nombre ?? ''
		};
	}

	contrasenasNoValidas(): boolean {
		const pass1 = this.registerForm.get('password')?.value;
		const pass2 = this.registerForm.get('password2')?.value;
		return pass1 !== pass2;
	}

	gototc() {
		const urlTree = this.router.createUrlTree(['/termsconditions']);
		const url = this.router.serializeUrl(urlTree);
		window.open(url, '_blank', 'noopener,noreferrer');
	}

	gotopp() {
		const urlTree = this.router.createUrlTree(['/privacypoli']);
		const url = this.router.serializeUrl(urlTree);
		window.open(url, '_blank', 'noopener,noreferrer');
	}
}
