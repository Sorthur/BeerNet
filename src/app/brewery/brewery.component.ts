import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { BreweryModel } from '../models/breweryModel';
import { Country } from '../models/enums/country';

@Component({
    selector: 'app-brewery',
    templateUrl: './brewery.component.html',
    styleUrls: ['./brewery.component.css']
})
export class BreweryComponent implements OnInit {
    declare brewery: BreweryModel;
    isBreweryLoaded: boolean = false;
    countryEnum = Country;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private api: ApiService
    ) { }

    ngOnInit(): void {
        // Get brewery id from url if possible, otherwise navigate to home page
        let breweryId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
        if (isNaN(breweryId)) {
            this.router.navigateByUrl("/");
            return;
        }
        this.getAndLoadBrewery(breweryId);
    }

    private async getAndLoadBrewery(beerId: number) {
        let beerOrNull = await this.getBrewery(beerId).then(b => { return b });
        if (beerOrNull == null) {
            this.router.navigateByUrl("/");
            return;
        }
        this.brewery = beerOrNull
        this.isBreweryLoaded = true;
    }

    async getBrewery(breweryId: number): Promise<BreweryModel | null> {
        let brewery!: BreweryModel;
        try {
            await this.api.getBrewery(breweryId)
                .then(data => {
                    brewery = data
                });
        }
        catch (error) {
            console.log(error)
        }
        return brewery;
    }
}