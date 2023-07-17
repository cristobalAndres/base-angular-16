import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PaymentsMethodsType } from '@app/pages/clients/shared';
import {
  TransactionsFiltersService,
  TransactionsService,
} from '@app/pages/transactions/data-access';
import { TransactionsFiltersComponent } from '@app/pages/transactions/features';
import { TransactionsTableComponent } from '@app/pages/transactions/ui';
import { PaginationComponent } from '@app/shared/components/tables';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { PaymentMethodsDataService } from '../../data-access';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TransactionsFiltersComponent,
    PaginationComponent,
    TransactionsTableComponent,
  ],
  selector: 'app-transaction-section',
  templateUrl: './transaction-section.component.html',
  styleUrls: ['./transaction-section.component.scss'],
})
export class TransactionSectionComponent {
  private paymentsMethodsDataService = inject(PaymentMethodsDataService);

  protected paymentsMethodsIdSelected: {
    id: string;
    type: PaymentsMethodsType;
  }[] = [];

  loadIdsSelected() {
    this.paymentsMethodsIdSelected = this.paymentsMethodsDataService
      .paymenthsMethodsList()
      .filter((payment) => payment.is_selected)
      .map((payment) => {
        return { id: payment.id, type: payment.payment_method_type };
      });

    // eslint-disable-next-line no-console
    console.log(this.paymentsMethodsIdSelected);
  }

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
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.isLoadingSubject.next(true)),
    switchMap(([filters, currentPage]) =>
      this.transactionsService
        .getTransactions({
          perPage: TransactionSectionComponent.ITEMS_PER_PAGE,
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
        TransactionSectionComponent.ITEMS_PER_PAGE > total_items
          ? total_items
          : TransactionSectionComponent.ITEMS_PER_PAGE,
    })),
  );

  protected onCurrentPageChange(currentPage: number) {
    this.currentPageSubject.next(currentPage);
  }
}
