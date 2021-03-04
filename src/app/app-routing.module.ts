import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerComponent } from './beer/beer.component';
import { BreweryComponent } from './brewery/brewery.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchBeerComponent } from './search-beer/search-beer.component';
import { SearchBreweryComponent } from './search-brewery/search-brewery.component';
import { SearchComponent } from './search/search.component';
import { UserAccountComponent } from './user-account/user-account.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'myprofile', component: UserAccountComponent },
    { path: 'search', component: SearchComponent, children: [{ path: 'beer', component: SearchBeerComponent }, { path: 'brewery', component: SearchBreweryComponent }] },
    { path: 'beer/:id', component: BeerComponent },
    { path: 'brewery/:id', component: BreweryComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
