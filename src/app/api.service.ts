import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginModel } from './models/loginModel';
import { LoginResponseModel } from './models/loginResponseModel';
import { BeerFilter } from './models/filters/beerFilter';
import { BeerModel } from './models/beerModel';
import { BeerRateModel } from './models/beerRateModel';
import { BreweryModel } from './models/breweryModel';
import { BreweryFilter } from './models/filters/breweryFilter';

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

    public async getBeers(beerFilter: BeerFilter, limit: number = 10, offset: number = 0): Promise<BeerModel[]> {
        let httpParams = new HttpParams()
            .set("Limit", limit.toString())
            .set("offset", offset.toString());

        let i: number = 0;
        for (let prop in beerFilter) {
            if (Object.prototype.hasOwnProperty.call(beerFilter, prop)) {
                if (Object.values(beerFilter)[i] != null) {
                    httpParams = httpParams.set(prop, Object.values(beerFilter)[i]);
                }
                i++;
            }
        }
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

    public async getBreweries(breweryFilter: BreweryFilter, limit: number = 10, offset: number = 0): Promise<BreweryModel[]> {
        let httpParams = new HttpParams()
            .set("Limit", limit.toString())
            .set("offset", offset.toString());

        let i: number = 0

        for (let prop in breweryFilter) {
            if (Object.prototype.hasOwnProperty.call(breweryFilter, prop)) {
                if (Object.values(breweryFilter)[i] != null) {
                    httpParams = httpParams.set(prop, Object.values(breweryFilter)[i]);
                }
                i++;
            }
        }
        return await this.httpClient.get<BreweryModel[]>(this.breweryUrl, { params: httpParams })
            .toPromise();
    }
}