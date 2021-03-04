import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppSettings } from 'src/AppSettings';
import { ApiService } from '../api.service';
import { RegisterModel } from '../models/registerModel';

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
        if (!this.checkIfPasswordIsCorrect(this.registerForm.value.password)) {
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

    checkIfPasswordIsCorrect(password: string): boolean {
        this.errorLabel = "";
        if (password.length < 6) {
            this.errorLabel = 'Passwords must be at least 6 characters';
            return false;
        }
        else if (password.match("^((?![a-z]).)*$")) {
            this.errorLabel = "Passwords must have at least one lowercase ('a'-'z')";
            return false;
        }
        else if (password.match("^((?![A-Z]).)*$")) {
            this.errorLabel = "Passwords must have at least one uppercase ('A'-'Z')";
            return false;
        }
        else if (password.match("^((?![0-9]).)*$")) {
            this.errorLabel = "Passwords must have at least one digit ('0'-'9')";
            return false;
        }
        else if (password.match(`^[^<>?:"{}|~!@#$%^&*()_+\`\\-=[\\]\;',.\\/]+$`)) {
            this.errorLabel = 'Passwords must have at least one non alphanumeric character';
            return false;
        }
        return true;
    }

    ngOnInit(): void { }
}
