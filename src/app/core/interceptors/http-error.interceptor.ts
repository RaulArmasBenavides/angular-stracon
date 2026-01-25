import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { alertHelper } from 'src/app/helper/alert.helper';

export const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
	const alert = inject(alertHelper);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === 400) {
				// alert.notify(error.error.message, 'warning');
			} else {
				// alert.error(error.status);
			}

			return throwError(() => error);
		})
	);
};
