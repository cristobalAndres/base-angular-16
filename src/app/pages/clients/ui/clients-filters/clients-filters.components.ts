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
import { SelectionDto } from '@app/shared/components/forms';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  tap,
} from 'rxjs';
import { CLientsFilters, ClientParameter } from '../../shared';

@Component({
  selector: 'app-clients-filters',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule],
  template: `<div class="container">
    <div class="row g-4">
      <div class="col-md-auto">
        <div class="input-row">
          <div class="d-flex justify-content-between">
            <app-select
              [withPlaceholder]="false"
              [options]="statusOptions"
              (optionChange)="onStatusChange($event)"
            />
            <input
              type="text"
              class="form-control input-text"
              placeholder="buscar..."
              aria-label="searchText"
              #searchText
            />
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class ClientsFiltersComponent implements AfterViewInit, OnDestroy {
  protected searchText = '';
  protected searchBy: ClientParameter | undefined = undefined;

  private inputEvent$!: Subscription;

  @Input({ required: true }) isLoading = false;
  @Input({ required: true }) statusOptions: SelectionDto<ClientParameter>[] =
    [];

  @Output() searchEvent = new EventEmitter<CLientsFilters>();

  @ViewChild('searchText')
  input!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.inputEvent$ = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.searchText = this.input.nativeElement?.value;
          this.searchEvent.emit({
            searchBy: this.searchBy,
            searchText: this.searchText,
          });
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.inputEvent$.unsubscribe();
  }

  protected onStatusChange(status: ClientParameter | undefined) {
    this.searchBy = status;
  }
}
