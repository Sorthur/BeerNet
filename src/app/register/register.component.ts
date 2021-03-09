import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppSettings } from 'src/AppSettings';
import { ApiService } from '../api.service';
import { RegisterModel } from '../models/registerModel';
import { ValidationPassword } from '../validation/validationPassword';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    errorLabel: string = '';
    constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) { }

    registerForm: FormGroup = new FormGroup({
        login: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    async register(): Promise<void> {
        this.errorLabel = '';
        if (this.registerForm.get('login')?.invalid) {
            this.errorLabel = 'Login is required';
            return;
        }
        if (this.registerForm.get('email')?.invalid) {
            this.errorLabel = 'Incorrect e-mail';
            return;
        }
        let passwordErrorMessage = ValidationPassword.checkIfPasswordIsCorrect(this.registerForm.value.password);
        if (passwordErrorMessage !== null) {
            this.errorLabel = passwordErrorMessage;
            return;
        }
        try {
            await this.api.registerUser(new RegisterModel(
                this.registerForm.value.login,
                this.registerForm.value.email,
                this.registerForm.value.password
            ));
        }
        catch (error) {
            if (error.status == 409) {
                this.errorLabel = "User already exists";
                return;
            }
            console.log(error);
        }
        window.alert("User registered successfully")
        this.router.navigate(['/']);
    }

    ngOnInit(): void { }
}
