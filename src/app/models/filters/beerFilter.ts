import { BeerStyle } from "../enums/beerStyle";
import { Country } from "../enums/country";

export class BeerFilter {
    constructor(
        public beerName?: string,
        public breweryName?: string,
        public country?: Country,
        public beerStyle?: BeerStyle,
        public extractFrom?: number,
        public extractTo?: number,
        public abvFrom?: number,
        public abvTo?: number
    ) { }
}