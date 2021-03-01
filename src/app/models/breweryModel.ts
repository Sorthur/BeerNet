import { BeerModel } from "./beerModel";
import { Country } from "./enums/country";

export class BreweryModel {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public country: Country,
        public beers: BeerModel[]
        // public image:string
    ) { }
}