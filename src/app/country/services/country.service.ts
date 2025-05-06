import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RESTCountry } from '../interfaces/rest-countries.iterfaces';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';


const API_URL = 'https://restcountries.com/v3.1'

@Injectable({providedIn: 'root'})
export class CountryService {

  private readonly httpClient = inject(HttpClient);


  constructor() { }


  searchByCapital( query: string ): Observable<Country[]> {
    query = query.toLowerCase();
    return this.httpClient.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountriesToCountryArray(resp)),
        catchError((error) => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obetener paises con ese query: ${query}`));
        })
      );
  }

  searchByCountry( query: string ): Observable<Country[]> {
    query = query.toLowerCase();
    return this.httpClient.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountriesToCountryArray(resp)),
        delay(2000),
        catchError((error) => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obetener paises con ese query: ${query}`));
        })
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | undefined> {
    code = code.toLowerCase();
    return this.httpClient.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountriesToCountryArray(resp)),
        map((countries) => countries.at(0)),
        catchError((error) => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obetener paises con ese query: ${code}`));
        })
      );
  }

}
