import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { TransactionFiltersDto } from '@app/shared/services/transactions';

@Injectable()
export class TransactionsFiltersService {
  private readonly transactionsFilters = signal<TransactionFiltersDto>({});
  readonly transactionsFilters$ = toObservable(this.transactionsFilters);

  updateTransactionsFilters(filters: TransactionFiltersDto) {
    this.transactionsFilters.update((currentFilters) => ({
      ...currentFilters,
      ...filters,
    }));
  }

  deleteAmountInTransactionFilters() {
    this.transactionsFilters.update((currentFilters) => {
      const current = { ...currentFilters };
      delete current?.amount;
      return current;
    });
  }
}
