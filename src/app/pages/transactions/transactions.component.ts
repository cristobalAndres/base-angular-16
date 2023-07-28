import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  of,
  shareReplay,
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
  protected readonly isLoadingSig = toSignal(
    this.isLoadingSubject.asObservable(),
  );

  protected hasError = signal(false);

  private readonly transactionsApi$ = combineLatest([
    this.transactionsFilters.transactionsFilters$,
    this.currentPageSubject,
  ]).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.isLoadingSubject.next(true)),
    switchMap(([filters, currentPage]) =>
      this.transactionsService
        .getTransactions({
          perPage: TransactionsComponent.ITEMS_PER_PAGE,
          currentPage,
          ...filters,
        })
        .pipe(finalize(() => this.isLoadingSubject.next(false))),
    ),
    shareReplay(1),
    catchError(() => {
      this.hasError.set(true);

      return of({
        transactions: [],
        current_page: 0,
        total_pages: 0,
        total_items: 0,
      });
    }),
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

  protected retryButtonClick() {
    this.hasError.set(false);
  }
}
