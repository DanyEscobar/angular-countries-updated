import { Component, inject, linkedSignal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

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
  public activateRoute = inject(ActivatedRoute);
  public router = inject(Router);

  public queryParam = this.activateRoute.snapshot.queryParamMap.get('query') ?? '';

  public query = linkedSignal<string>(() => this.queryParam);


  public countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if ( !request.query ) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query
        }
      });

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
