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

    registerForm: FormGroup = this.formBuilder.group({
        login: '',
        email: '',
        password: ''
    });

    async register(): Promise<void> {
        this.errorLabel = '';
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
