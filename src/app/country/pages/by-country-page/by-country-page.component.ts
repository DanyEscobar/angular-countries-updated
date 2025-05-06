import { Component, inject, resource, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [
    SearchInputComponent,
    ListComponent,
  ],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  public countryService = inject(CountryService);

  public query = signal<string>('');


  public countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if ( !request.query ) return of([]);

      return this.countryService.searchByCountry(request.query)
    },
  });


  // public countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if ( !request.query ) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     );
  //   },
  // });
}
