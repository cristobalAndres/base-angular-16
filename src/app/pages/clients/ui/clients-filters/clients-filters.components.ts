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
import { SharedModule } from '@app/shared';
import { IconButtonComponent } from '@app/shared/components/buttons';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  tap,
} from 'rxjs';
import { CLientsFilters } from '../../shared';

@Component({
  selector: 'app-clients-filters',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IconButtonComponent,
    NgbTooltip,
  ],
  template: `<div class="container">
    <div class="row g-4">
      <div class="col-md-auto">
        <input
          type="text"
          class="form-control input-text"
          placeholder="Buscar"
          aria-label="searchText"
          #searchText
        />
      </div>

      <div class="col-md-auto">
        <app-icon-button
          [ngbTooltip]="'Limpiar filtros'"
          [icon]="'bi-eraser'"
          (clickEmiter)="filtersReset()"
        />
      </div>
    </div>
  </div>`,
  styles: [
    `
      input.input-text {
        margin-left: 8px;
      }
    `,
  ],
})
export class ClientsFiltersComponent implements AfterViewInit, OnDestroy {
  protected searchText = '';

  private inputEvent$!: Subscription;

  @Input({ required: true }) isLoading = false;

  @Output() searchEvent = new EventEmitter<CLientsFilters>();

  @ViewChild('searchText')
  input!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.inputEvent$ = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        map((event) => event.target as HTMLInputElement),
        tap(({ value }) => this.searchEvent.emit({ searchText: value })),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.inputEvent$.unsubscribe();
  }

  filtersReset() {
    this.input.nativeElement.value = '';
    this.searchEvent.emit({ searchText: '' });
  }
}
