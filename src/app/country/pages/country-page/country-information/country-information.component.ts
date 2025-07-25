import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-information',
  imports: [
    DecimalPipe,
  ],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {

  public country = input.required<Country>();
  public currentYear = computed(() => {
    return new Date().getFullYear();
  });

}
