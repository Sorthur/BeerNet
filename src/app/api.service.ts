import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginModel } from './models/loginModel';
import { LoginResponseModel } from './models/loginResponseModel';
import { BeerFilter } from './models/filters/beerFilter';
import { BeerModel } from './models/beerModel';
import { BeerRateModel } from './models/beerRateModel';
import { BreweryModel } from './models/breweryModel';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private loginUrl: string = 'https://beernetapi.azurewebsites.net/api/authenticate/login/';
    private beersUrl: string = 'https://beernetapi.azurewebsites.net/api/beers/';
    private beerRatesUrl: string = 'https://beernetapi.azurewebsites.net/api/beers/rate/';
    private breweryUrl: string = 'https://beernetapi.azurewebsites.net/api/breweries/';

    constructor(private httpClient: HttpClient) { }

    // ******************************************** Authentication ********************************************
    public async getToken(loginModel: LoginModel) {
        return await this.httpClient.post<LoginResponseModel>(this.loginUrl, loginModel)
            .toPromise();
    }

    // ******************************************** Beers ********************************************

    public async getBeers(beerFilter: BeerFilter): Promise<BeerModel[]> {
        let httpParams = new HttpParams().set("Limit", "2");
        return await this.httpClient.get<BeerModel[]>(this.beersUrl, { params: httpParams })
            .toPromise();
    }

    public async getBeer(id: number): Promise<BeerModel> {
        return await this.httpClient.get<BeerModel>(this.beersUrl + id)
            .toPromise();
    }

    public async postBeerRate(beerId: number, jwt: string, beerRate: BeerRateModel) {
        return await this.httpClient.post(this.beerRatesUrl + beerId, beerRate, { headers: { "Authorization": `Bearer ${jwt}` } })
            .toPromise();
    }

    // ******************************************** Breweries ********************************************

    public async getBrewery(breweryId: number): Promise<BreweryModel> {
        return await this.httpClient.get<BreweryModel>(this.breweryUrl + breweryId)
            .toPromise();
    }
}