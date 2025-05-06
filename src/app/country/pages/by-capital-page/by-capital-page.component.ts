import { Component, inject, resource, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { CountryService } from '../../services/country.service';
// import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [
    SearchInputComponent,
    ListComponent,
  ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  public countryService = inject(CountryService);

  // public isLoading = signal<boolean>(false);
  // public isError = signal<string | null>(null);
  // public countries = signal<Country[]>([]);
  public query = signal<string>('');


  public countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if ( !request.query ) return of([]);

      return this.countryService.searchByCapital(request.query)
    },
  });

  // public countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if ( !request.query ) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     );
  //   },
  // });




  // onSearch( query: string ) {
  //   if ( this.isLoading() ) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query).pipe().subscribe({
  //     next: ( countries ) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: ( err ) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     }
  //   });
  // }
}
