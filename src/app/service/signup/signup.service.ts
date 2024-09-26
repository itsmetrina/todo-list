import { Injectable } from '@angular/core';
import { SignupFormData } from '../../modal/signup.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginFormData } from '../../modal/login.interface';

@Injectable({
	providedIn: 'root'
})
export class SignupService {

	private signupData = new BehaviorSubject<SignupFormData | null>(null); // Create a BehaviorSubject that starts with null and can hold SignupFormData
	signupData$ = this.signupData.asObservable(); // Expose the BehaviorSubject as an Observable

	setSignupData(data: SignupFormData): void {
		this.signupData.next(data);
	}

	getSignupData(): SignupFormData | null {
		return this.signupData.value;
	}

	private loginData = new BehaviorSubject<LoginFormData | null>(null); // Create a BehaviorSubject that starts with null and can hold SignupFormData
	loginData$ = this.loginData.asObservable(); // Expose the BehaviorSubject as an Observable

	setLoginData(data: LoginFormData): void {
		this.loginData.next(data);
	}

	getLoginData(): LoginFormData | null {
		return this.loginData.value;
	}
}