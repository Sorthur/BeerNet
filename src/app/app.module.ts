import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CookieService } from 'ngx-cookie-service';
import { UserAccountComponent } from './user-account/user-account.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { SearchBeerComponent } from './search-beer/search-beer.component';
import { BeerComponent } from './beer/beer.component';
import { BreweryComponent } from './brewery/brewery.component';
import { SearchBreweryComponent } from './search-brewery/search-brewery.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationBarComponent,
        UserAccountComponent,
        LoginComponent,
        SearchComponent,
        SearchBeerComponent,
        BeerComponent,
        BreweryComponent,
        SearchBreweryComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
