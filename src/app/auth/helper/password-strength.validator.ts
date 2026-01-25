import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
	const regex = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
	return (control: AbstractControl): ValidationErrors | null => {
		const v = control.value as string;
		if (!v) return null;
		return regex.test(v) ? null : { passwordStrength: true };
	};
}

export function matchFieldsValidator(field: string, fieldToMatch: string) {
	return (form: FormGroup) => {
		const a = form.get(field);
		const b = form.get(fieldToMatch);
		if (!a || !b) return null;
		b.setErrors(a.value === b.value ? null : { notEqual: true });
		return null;
	};
}

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
	const formGroup = control as FormGroup;
	const password = formGroup.get('password')?.value;
	const confirmPassword = formGroup.get('c_password')?.value;
	return password === confirmPassword ? null : { mismatch: true };
}
