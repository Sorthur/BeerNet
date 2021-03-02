import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { AppSettings } from 'src/AppSettings';
import { BeerModel } from '../models/beerModel';
import { BeerRateModel } from '../models/beerRateModel';
import { BeerStyle } from '../models/enums/beerStyle';
import { Country } from '../models/enums/country';

@Component({
    selector: 'app-beer',
    templateUrl: './beer.component.html',
    styleUrls: ['./beer.component.css']
})
export class BeerComponent implements OnInit {
    readonly initialRateValue: number = 2.5;
    declare beer: BeerModel;
    beerStyleEnum = BeerStyle;
    countryEnum = Country;
    isBeerLoaded: boolean = false;
    rateValue: number = this.initialRateValue;
    beerRateRange = new FormControl(this.initialRateValue);
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private api: ApiService,
        private cookieService: CookieService
    ) { }

    updateRangeValue() {
        this.rateValue = this.beerRateRange.value;
    }

    async ngOnInit(): Promise<void> {
        // Get beer id from url if possible, otherwise navigate to home page
        let beerId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
        if (isNaN(beerId)) {
            this.router.navigateByUrl("/");
            return;
        }
        this.getAndLoadBeer(beerId);
    }

    private async getAndLoadBeer(beerId: number) {
        let beerOrNull = await this.getBeer(beerId).then(b => { return b });
        if (beerOrNull == null) {
            this.router.navigateByUrl("/");
            return;
        }
        this.beer = beerOrNull
        this.isBeerLoaded = true;
    }

    async getBeer(beerId: number): Promise<BeerModel | null> {
        let beer!: BeerModel;
        try {
            await this.api.getBeer(beerId)
                .then(data => {
                    beer = data
                });
        }
        catch (error) {
            console.log(error)
        }
        return beer;
    }

    async rateBeer(description: string, rate: number) {
        console.log(`opis: ${description}; rate: ${rate}`)
        console.log(`token: ${this.cookieService.get(AppSettings.JWT_COOKIE_NAME)}`)
        try {
            await this.api.postBeerRate(
                this.beer.id,
                this.cookieService.get(AppSettings.JWT_COOKIE_NAME),
                new BeerRateModel(0, rate, description)
            ).then(data => {
                console.log(data)
            });
        }
        catch (error) {
            if (error.status = 401) {
                window.alert("Please login first");
            }
            return;
        }
        this.getAndLoadBeer(this.beer.id);
    }
}
