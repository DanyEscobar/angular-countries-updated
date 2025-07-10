import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RESTCountry } from '../interfaces/rest-countries.iterfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';


const API_URL = 'https://restcountries.com/v3.1'

@Injectable({providedIn: 'root'})
export class CountryService {

  private readonly httpClient = inject(HttpClient);
  private readonly queryCacheCapital = new Map<string, Country[]>();
  private readonly queryCacheCountry = new Map<string, Country[]>();
  private readonly queryCacheRegion = new Map<Region, Country[]>();


  constructor() { }


  searchByCapital( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    if ( this.queryCacheCapital.has(query) ) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.httpClient.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountriesToCountryArray(resp)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        catchError((error) => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obetener paises con ese query: ${query}`));
        })
      );
  }

  searchByCountry( query: string ): Observable<Country[]> {
    const url = `${API_URL}/name/${query}`
    query = query.toLowerCase();

    if ( this.queryCacheCountry.has(query) ) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.httpClient.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountriesToCountryArray(resp)),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
        delay(2000),
        catchError((error) => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obetener paises con ese query: ${query}`));
        })
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | undefined> {
    const url = `${API_URL}/alpha/${code.toLowerCase()}`
    return this.httpClient.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountriesToCountryArray(resp)),
        map((countries) => countries.at(0)),
        catchError((error) => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obetener paises con ese query: ${code}`));
        })
      );
  }

  searchCountryByRegion( region: Region ): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`;

    if ( this.queryCacheRegion.has(region) ) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.httpClient.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountriesToCountryArray(resp)),
        tap((countries) => this.queryCacheRegion.set(region, countries)),
        catchError((error) => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obetener región con esa región: ${region}`));
        })
      );
  }

}
