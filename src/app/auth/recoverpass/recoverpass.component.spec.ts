import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverpassComponent } from './recoverpass.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('RecoverpassComponent', () => {
	let component: RecoverpassComponent;
	let fixture: ComponentFixture<RecoverpassComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RecoverpassComponent],
			providers: [
				provideHttpClient(withInterceptorsFromDi()), // ✅ reemplaza HttpClientTestingModule
				provideRouter([])
			]
		});
		fixture = TestBed.createComponent(RecoverpassComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
