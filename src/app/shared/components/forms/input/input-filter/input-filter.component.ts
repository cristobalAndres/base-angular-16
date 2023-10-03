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
  selector: 'app-input-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss'],
})
export class InputFilterComponent implements AfterViewInit, OnDestroy {
  private inputEvent$!: Subscription;

  @Input() type = 'text';
  @Input() name = '';

  @Input() placeHolderText = 'Buscar';
  @Input({ required: true }) isLoading = false;

  @Output() searchEvent = new EventEmitter();

  @ViewChild('searchText')
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
            this.searchEvent.emit({ value: value, name: this.name });
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
    this.searchEvent.emit({ value: '', name: this.name });
  }
}
