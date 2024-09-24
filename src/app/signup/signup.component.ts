import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignupFormData } from '../modal/signup.interface';
import { SignupService } from '../service/signup/signup.service';

@Component({
	selector: 'app-signup',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.css'
})
export class SignupComponent {

	signupForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder, 
		private signupservice: SignupService,
		private router: Router
	) {
		this.signupForm = this.formBuilder.group({
			firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
			lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
			username: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required]
		}, { validators: this.passwordMatchValidator });
	}

	passwordMatchValidator = (form: FormGroup) => {
		return form.get('password')?.value === form.get('confirmPassword')?.value
			? null : { mismatch: true };
	}

	onSubmit = () => {
		if (this.signupForm.valid) {
			const formData: SignupFormData = {
				firstName: this.signupForm.get('firstName')?.value!,
				lastName: this.signupForm.get('lastName')?.value!,
				username: this.signupForm.get('username')?.value!,
				password: this.signupForm.get('password')?.value!,
				confirmPassword: this.signupForm.get('confirmPassword')?.value!
			};
			// Handle successful signup logic here
			this.signupservice.setSignupData(formData);
			this.signupForm.reset();
			// Optionally redirect to another page
			this.router.navigate(['/tasks']);
		} else {
			this.signupForm.markAllAsTouched(); // Show validation errors
		}
	}
}