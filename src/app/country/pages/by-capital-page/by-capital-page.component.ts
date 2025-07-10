import { Component, inject, linkedSignal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

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
  public activateRoute = inject(ActivatedRoute);
  public router = inject(Router);
  public queryParam = this.activateRoute.snapshot.queryParamMap.get('query') ?? '';

  public query = linkedSignal<string>(() => this.queryParam);


  public countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if ( !request.query ) return of([]);

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      });

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
