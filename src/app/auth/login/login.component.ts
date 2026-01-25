import { Component, OnInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { alertHelper } from 'src/app/helper/alert.helper';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginForm } from 'src/app/core/models/auth/login-form.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SharedModule } from 'src/app/shared/shared.module';
import { TuviheroComponent } from 'src/app/shared/components/tuvihero/tuvihero.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxCaptchaModule, SharedModule, TuviheroComponent],
	standalone: true
})
export class LoginComponent implements OnInit {
	@ViewChild('recaptcha', { static: false }) recaptchaElement!: ElementRef;
	public formSubmitted = false;
	public auth2: any;
	isRecovering: boolean = false;
	isVerifying: boolean = false;
	tokenGoogle: string = '';
	email: string = '';
	isBrowser: boolean = false;
	isValidCaptcha: boolean = true;
	showPassword: boolean = false;
	// siteKey: string = 'siteKey';TODO
	captchaPassed: boolean = false;
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
		@Inject(PLATFORM_ID) private platformId: Object,
		private readonly router: Router,
		private readonly alert: alertHelper,
		private readonly loginService: AuthService
	) {}

	ngOnInit(): void {
		this.isBrowser = isPlatformBrowser(this.platformId);
	}

	login() {
		this.formSubmitted = true;

		this.isValidCaptcha = true;
		this.isLoading = true;

		this.isLoading = true;
		this.loginService.logintest(this.getLoginFormValue()).subscribe(
			(resp: any) => {
				this.loginService.loginSuccess(resp);
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
	getLoginFormValue(): LoginForm {
		const { email, password } = this.loginForm.value;

		return {
			email: email ?? '',
			password: password ?? ''
			//   recaptcha: recaptcha ?? ''
		};
	}

	resolved(captchaResponse: string) {
		this.tokenGoogle = captchaResponse;
	}

	goToRegister() {
		this.router.navigate(['/register']);
	}
	requestAccessCode() {
		this.email = this.recoverForm.value.email!;
		this.isLoading = true;
		this.loginService.requestAccessCode(this.email).subscribe({
			next: () => {
				this.isVerifying = true;
				this.isRecovering = false;
				this.router.navigate(['/recoverpass'], { queryParams: { email: this.email } });
				this.isLoading = false;
			},
			error: (err) => this.alert.notifyError(err.error.message)
		});
	}

	onCaptchaSuccess(token: string) {
		this.captchaPassed = true;
		// this.loginForm.get('recaptcha')?.setValue(token);
	}
}
