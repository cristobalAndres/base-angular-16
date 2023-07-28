import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { TransactionFiltersDto } from './dtos';

@Injectable()
export class TransactionsFiltersService {
  private readonly transactionsFilters = signal<TransactionFiltersDto>({});
  readonly transactionsFilters$ = toObservable(this.transactionsFilters);

  updateTransactionsFilters(filters: Partial<TransactionFiltersDto>) {
    this.transactionsFilters.update((currentFilters) => ({
      ...currentFilters,
      ...filters,
    }));
  }
}
