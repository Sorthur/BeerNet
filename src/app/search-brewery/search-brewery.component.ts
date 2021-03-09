import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { BreweryModel } from '../models/breweryModel';
import { Country } from '../models/enums/country';
import { BreweryFilter } from '../models/filters/breweryFilter';

@Component({
    selector: 'app-search-brewery',
    templateUrl: './search-brewery.component.html',
    styleUrls: ['./search-brewery.component.css']
})
export class SearchBreweryComponent implements OnInit {
    isApiCallAwaited: boolean = false;
    declare breweryModels: BreweryModel[];
    countryEnum = Country;
    countryKeys: any[];
    constructor(private formBuilder: FormBuilder, private api: ApiService) {
        // Object.values() returns enum's values and keys, so we remove half of the array that contains keys
        this.countryKeys = Object.values(this.countryEnum);
        this.countryKeys = this.countryKeys.slice(0, this.countryKeys.length / 2);
    }

    searchBreweryForm: FormGroup = this.formBuilder.group({
        breweryName: '',
        country: ''
    });

    async searchBreweries() {
        this.isApiCallAwaited = true;
        try {
            await this.api.getBreweries(new BreweryFilter(
                this.searchBreweryForm.value.breweryName,
                this.searchBreweryForm.value.country
            )).then(data => {
                this.breweryModels = data;
            });
        }
        catch (error) {
            console.log(error);
            return;
        }
        finally {
            this.isApiCallAwaited = false;
        }
    }

    ngOnInit(): void { }
}
