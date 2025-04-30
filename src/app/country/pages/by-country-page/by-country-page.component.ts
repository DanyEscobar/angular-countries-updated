import { Component } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';

@Component({
  selector: 'app-by-country-page',
  imports: [
    SearchInputComponent,
    ListComponent,
  ],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {



  onSearch( value: string ) {
    console.log(value);
  }
}
