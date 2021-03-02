import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { BeerModel } from '../models/beerModel';
import { BeerStyle } from '../models/enums/beerStyle';
import { Country } from '../models/enums/country';
import { BeerFilter } from '../models/filters/beerFilter';

@Component({
    selector: 'app-search-beer',
    templateUrl: './search-beer.component.html',
    styleUrls: ['./search-beer.component.css']
})
export class SearchBeerComponent implements OnInit {
    declare beerModels: BeerModel[];
    beerStyleEnum = BeerStyle;
    countryEnum = Country;
    beerStyleKeys: any[];
    countryKeys: any[];
    constructor(private formBuilder: FormBuilder, private api: ApiService) {
        this.beerStyleKeys = Object.values(this.beerStyleEnum);
        // Object.values() returns enum's values and keys, so we remove half of the array that contains keys
        this.beerStyleKeys = this.beerStyleKeys.slice(0, this.beerStyleKeys.length / 2)
        this.countryKeys = Object.values(this.countryEnum);
        this.countryKeys = this.countryKeys.slice(0, this.countryKeys.length / 2);
    }
    searchBeerForm: FormGroup = this.formBuilder.group({
        beerName: '',
        breweryName: '',
        country: '',
        beerStyle: '',
        extractFrom: '',
        extractTo: '',
        abvFrom: '',
        abvTo: ''
    });


    async searchBeers() {
        console.log("start: " + this.searchBeerForm.value.beerName);
        try {
            await this.api.getBeers(new BeerFilter(
                this.searchBeerForm.value.beerName,
                this.searchBeerForm.value.breweryName,
                this.searchBeerForm.value.country,
                this.searchBeerForm.value.beerStyle,
                this.searchBeerForm.value.extractFrom,
                this.searchBeerForm.value.extractTo,
                this.searchBeerForm.value.abvFrom,
                this.searchBeerForm.value.abvTo
            )).then(data => {
                this.beerModels = data;
            });
        }
        catch (error) {
            console.log(error)
            return;
        }
        console.log(this.beerModels); // We got beers array - brewery info included
    }

    ngOnInit(): void { }
}
