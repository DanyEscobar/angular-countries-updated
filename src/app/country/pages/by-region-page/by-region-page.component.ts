import { Component } from '@angular/core';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-by-region-page',
  imports: [
    SearchInputComponent,
    ListComponent,
  ],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {



  onSearch( value: string ) {
    console.log(value);
  }
}
