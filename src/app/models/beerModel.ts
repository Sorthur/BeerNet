import { BeerRateModel } from "./beerRateModel";
import { BreweryModel } from "./breweryModel";
import { BeerStyle } from "./enums/beerStyle";
import { Country } from "./enums/country";

export class BeerModel {
    constructor(
        public id: number,
        public name: string,
        public brewery: BreweryModel,
        public style: BeerStyle,
        public extract: number,
        public abv: number,
        public description: string,
        public beerRates: BeerRateModel[],
        public averageRating: number,
        // public image:string
    ) { }

    get styl(): string {
        return "eloski"
    }
}