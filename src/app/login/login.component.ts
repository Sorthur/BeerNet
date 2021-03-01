import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { AppSettings } from 'src/AppSettings';
import { LoginModel } from '../models/loginModel';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private api: ApiService, private cookieService: CookieService, private router: Router) { }
    errorLabel: string = '';
    token: string = '';

    loginForm: FormGroup = this.formBuilder.group({
        login: '',
        password: ''
    });

    /** Sets cookie "id_token" with JWT*/
    async Login(): Promise<void> {
        try {
            await this.api.getToken(new LoginModel(this.loginForm.value.login, this.loginForm.value.password))
                .then(data => {
                    this.token = data.token
                });
        }
        catch (error) {
            if (error.status == 401) {
                this.errorLabel = 'Invalid login or password';
                return;
            }
            this.errorLabel = 'Error occured';
            return;
        }
        this.cookieService.set(AppSettings.JWT_COOKIE_NAME, this.token);
        this.router.navigate(['/myprofile']);
    }

    ngOnInit(): void {
    }

}
