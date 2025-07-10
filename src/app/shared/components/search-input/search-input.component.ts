import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  public placeholder = input<string>('Buscar');
  public value = output<string>();
  public initialValue = input<string>();
  public inputValue = linkedSignal<string>(() => this.initialValue() ?? '');
  public debounceTime = input<number>(300);

  debouncerEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    })
  });


}
