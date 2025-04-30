import { Component } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [
    SearchInputComponent,
    ListComponent,
  ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {



  onSearch( value: string ) {
    console.log(value);
  }
}
