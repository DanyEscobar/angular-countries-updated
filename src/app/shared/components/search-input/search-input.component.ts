import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  public placeholder = input<string>('Buscar');
  public value = output<string>();

  onSearch( value: string ) {
    this.value.emit(value);
  }
}
