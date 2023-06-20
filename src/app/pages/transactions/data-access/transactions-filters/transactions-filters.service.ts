import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { TransactionsFiltersDto } from '../../shared';

@Injectable()
export class TransactionsFiltersService {
  private readonly transactionsFilters = signal<TransactionsFiltersDto>({});
  readonly transactionsFilters$ = toObservable(this.transactionsFilters);

  updateTransactionsFilters(filters: Partial<TransactionsFiltersDto>) {
    this.transactionsFilters.update((currentFilters) => ({
      ...currentFilters,
      ...filters,
    }));
  }
}
