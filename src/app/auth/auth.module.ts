import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
// import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
	declarations: [],
	exports: [],
	imports: [CommonModule, AuthRoutingModule, RouterModule, FormsModule, SharedModule, ReactiveFormsModule],
	providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AuthModule {}
