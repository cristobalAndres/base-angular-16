import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { TransactionsFiltersService, TransactionsService } from './data-access';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  private static readonly ITEMS_PER_PAGE = 10;

  private readonly transactionsService = inject(TransactionsService);
  private readonly transactionsFilters = inject(TransactionsFiltersService);

  private readonly currentPageSubject = new BehaviorSubject(1);
  protected readonly currentPage$ = this.currentPageSubject.asObservable();

  private readonly isLoadingSubject = new BehaviorSubject(false);
  protected readonly isLoading$ = this.isLoadingSubject.asObservable();

  private readonly transactionsApi$ = combineLatest([
    this.transactionsFilters.transactionsFilters$,
    this.currentPageSubject,
  ]).pipe(
    tap(() => this.isLoadingSubject.next(true)),
    debounceTime(300),
    switchMap(([filters, currentPage]) =>
      this.transactionsService
        .getTransactions({
          perPage: TransactionsComponent.ITEMS_PER_PAGE,
          currentPage,
          ...filters,
        })
        .pipe(finalize(() => this.isLoadingSubject.next(false))),
    ),
  );

  protected readonly transactions$ = this.transactionsApi$.pipe(
    map(({ transactions }) => transactions),
  );

  protected readonly pagination$ = this.transactionsApi$.pipe(
    map(({ total_items, total_pages, current_page }) => ({
      totalItems: total_items,
      totalPages: total_pages,
      currentPage: current_page,
      itemsPerPage:
        TransactionsComponent.ITEMS_PER_PAGE > total_items
          ? total_items
          : TransactionsComponent.ITEMS_PER_PAGE,
    })),
  );

  protected onCurrentPageChange(currentPage: number) {
    this.currentPageSubject.next(currentPage);
  }
}
