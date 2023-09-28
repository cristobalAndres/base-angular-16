import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-input-number-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberFilterComponent implements AfterViewInit, OnDestroy {
  private inputEvent$!: Subscription;

  @Input() name = '';

  @Input() placeHolderNumber = 'Buscar';
  @Input({ required: true }) isLoading = false;

  @Output() searchEvent = new EventEmitter();

  @ViewChild('searchNumber')
  input!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    if (this.input && this.input.nativeElement) {
      this.inputEvent$ = fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          filter(Boolean),
          debounceTime(500),
          distinctUntilChanged(),
          map((event) => event.target as HTMLInputElement),
          tap(({ value }) => {
            const valor = parseFloat(value);
            this.searchEvent.emit({ value: valor, name: this.name });
          }),
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.inputEvent$.unsubscribe();
  }

  reset() {
    this.input.nativeElement.value = '';
    this.searchEvent.emit({ value: 0, name: this.name });
  }
}
