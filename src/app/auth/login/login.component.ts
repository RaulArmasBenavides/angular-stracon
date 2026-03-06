import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoginRequest } from 'src/app/core/models/auth.model';
import { AlertHelper } from 'src/app/helper/alert.helper';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	standalone: true
})
export class LoginComponent implements OnInit {
	public formSubmitted = false;
	public auth2: any;
	isRecovering: boolean = false;
	isVerifying: boolean = false;

	email: string = '';
	isBrowser: boolean = false;

	showPassword: boolean = false;

	isLoading: boolean = false;
	loginForm = new FormGroup({
		email: new FormControl({ value: null, disabled: false }, [Validators.required]),
		password: new FormControl({ value: null, disabled: false }, [Validators.required]),
		remember: new FormControl()
	});

	recoverForm = new FormGroup({
		email: new FormControl({ value: null, disabled: false }, [Validators.required]),
		accessCode: new FormControl({}, [Validators.required])
	});
	constructor(
		@Inject(PLATFORM_ID) private readonly platformId: Object,
		private readonly router: Router,
		private readonly alert: AlertHelper,
		private readonly loginService: AuthService
	) {}

	// private readonly alert: alertHelper,

	ngOnInit(): void {
		this.isBrowser = isPlatformBrowser(this.platformId);
	}

	login() {
		this.formSubmitted = true;

		this.isLoading = true;

		this.isLoading = true;
		this.loginService.login(this.getLoginFormValue()).subscribe(
			(resp: any) => {
				this.isLoading = false;
				this.router.navigateByUrl('/main');
			},
			(err) => {
				this.isLoading = false;

				this.alert.notify('Usuario o password incorrectos', 'warning');
			}
		);
	}
	showRecoverForm() {
		this.isRecovering = true;
	}

	showLoginForm() {
		this.isRecovering = false;
	}
	getLoginFormValue(): LoginRequest {
		const { email, password } = this.loginForm.value;

		return {
			userName: email ?? '',
			password: password ?? ''
			//   recaptcha: recaptcha ?? ''
		};
	}

	requestAccessCode() {
		//TODO
	}
}
