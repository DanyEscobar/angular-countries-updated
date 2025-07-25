import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [
    DecimalPipe,
    RouterLink,
  ],
  templateUrl: './list.component.html',
})
export class ListComponent {

  public countries = input.required<Country[]>();
  public errorMessage = input<string | unknown | null>();
  public isLoading = input<boolean>(false);
  public isEmpty = input<boolean>(false);

}
