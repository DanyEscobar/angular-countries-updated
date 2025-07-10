import { Component, inject, linkedSignal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateRegion(region: string): Region {
  region = region.toLowerCase();
  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic'
  };
  return validRegions[region] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [
    ListComponent,
  ],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  public countryService = inject(CountryService);
  public activateRoute = inject(ActivatedRoute);
  public router = inject(Router);
  public queryParam = this.activateRoute.snapshot.queryParamMap.get('region') ?? '';

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  public selectedRegion = linkedSignal<Region>(() => validateRegion(this.queryParam));

  public countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if ( !request.region ) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region
        }
      });

      return this.countryService.searchCountryByRegion(request.region);
    }
  });


}
