import { Country } from "../enums/country";

export class BreweryFilter {
    constructor(
        public breweryName?: string,
        public country?: Country
    ) { }
}