import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.iterfaces";



export class CountryMapper {

  static mapRestCountryToCountry( restCountry: RESTCountry ): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa']?.common ?? 'No Spanish Name',
      capital: restCountry.capital?.join(','),
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    };
  }

  static mapRestCountriesToCountryArray( restCountries: RESTCountry[] ): Country[] {
    // return restCountries.map((country) => this.mapRestCountryToCountry(country));
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
