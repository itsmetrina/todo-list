import { Injectable } from '@angular/core';
import { SignupFormData } from '../../modal/signup.interface';
import { BehaviorSubject, Observable } from 'rxjs';

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
}