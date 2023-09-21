import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-cash-ins-filters',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, NgbTooltip],
  templateUrl: './cash-ins-filters.component.html',
})
export class CashInsFiltersComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  @Output() changeSearch = new EventEmitter<string | undefined>();

  @ViewChild('search', { static: false })
  readonly searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        map((event) => event.target as HTMLInputElement),
        map((input) => input.value.trim()),
        tap((search) => this.changeSearch.emit(search)),
      )
      .subscribe();
  }

  protected onSearchChange(search: string) {
    this.changeSearch.emit(search);
  }

  protected resetFilters() {
    this.searchInput.nativeElement.value = '';
    this.changeSearch.emit();
  }
}
