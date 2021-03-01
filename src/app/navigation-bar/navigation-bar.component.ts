import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppSettings } from 'src/AppSettings';


@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

    constructor(private cookieService: CookieService) { }

    IsLogged(): boolean {
        if (this.cookieService.check(AppSettings.JWT_COOKIE_NAME)) {
            return true;
        }
        return false;
    }

    Logout() {
        if (this.cookieService.check(AppSettings.JWT_COOKIE_NAME)) {
            this.cookieService.delete(AppSettings.JWT_COOKIE_NAME);
        }
    }
    ngOnInit(): void { }
}
