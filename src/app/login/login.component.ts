import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignupService } from '../service/signup/signup.service';
import { LoginFormData } from '../modal/login.interface';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {
	loginForm!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private loginservice: SignupService,
		private router: Router
	) {
		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	onSubmit = () => {
		if (this.loginForm.valid) {
			const formData: LoginFormData = {
				username: this.loginForm.get('username')?.value!,
				password: this.loginForm.get('password')?.value!,
			};
			// Handle successful signup logic here
			this.loginservice.setLoginData(formData);
			this.loginForm.reset();
			// Optionally redirect to another page
			this.router.navigate(['/tasks']);
		} else {
			this.loginForm.markAllAsTouched(); // Show validation errors
		}
	}
}