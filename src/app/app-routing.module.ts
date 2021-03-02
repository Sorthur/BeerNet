import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerComponent } from './beer/beer.component';
import { LoginComponent } from './login/login.component';
import { SearchBeerComponent } from './search-beer/search-beer.component';
import { SearchComponent } from './search/search.component';
import { UserAccountComponent } from './user-account/user-account.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'myprofile', component: UserAccountComponent },
    { path: 'search', component: SearchComponent, children: [{ path: 'beer', component: SearchBeerComponent }] },
    { path: 'beer/:id', component: BeerComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
