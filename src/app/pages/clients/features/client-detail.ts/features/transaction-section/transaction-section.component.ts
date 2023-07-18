import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { PaymentsMethodsType } from '@app/pages/clients/shared';
import { TransactionsTableComponent } from '@app/pages/transactions/ui';
import { SpinnerComponent } from '@app/shared/components/loaders/spinner';
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
import {
  ClientsDataService,
  PaymentMethodsDataService,
  TransactionsService,
} from '../../data-access';
import { TransactionsFiltersService } from '../../data-access/transactions-filter-service';
import { ClientTransactionsTableComponent } from '../../ui/client-transactions-table';
import { TransactionsFiltersComponent } from '../transactions-filters';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    TransactionsTableComponent,
    ClientTransactionsTableComponent,
    SpinnerComponent,
    TransactionsFiltersComponent,
  ],
  selector: 'app-transaction-section',
  templateUrl: './transaction-section.component.html',
  styleUrls: ['./transaction-section.component.scss'],
})
export class TransactionSectionComponent {
  private paymentsMethodsDataService = inject(PaymentMethodsDataService);
  private clientDataService = inject(ClientsDataService);

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
    toObservable(this.clientDataService.clientSig),
    toObservable(this.paymentsMethodsDataService.selectedPaymentMethodIds),
  ]).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.isLoadingSubject.next(true)),
    switchMap(([filters, currentPage, clientData, paymentSelected]) =>
      this.transactionsService
        .getTransactions({
          perPage: TransactionSectionComponent.ITEMS_PER_PAGE,
          currentPage,
          userId: clientData.id,
          cardIds: this.getElementsIdByType(
            paymentSelected,
            PaymentsMethodsType.CARD,
          ),
          accountIds: this.getElementsIdByType(
            paymentSelected,
            PaymentsMethodsType.ACCOUNT,
          ),
          ...filters,
        })
        .pipe(finalize(() => this.isLoadingSubject.next(false))),
    ),
  );

  getElementsIdByType(selected: Set<string>, type: PaymentsMethodsType) {
    const ids = this.paymentsMethodsDataService
      .paymenthsMethodsList()
      .filter(
        (paymentMethod) =>
          selected.has(paymentMethod.id) &&
          paymentMethod.payment_method_type === type,
      )
      .map((paymentMethod) => paymentMethod.id);

    if (ids.length === 0) {
      return '';
    }

    return ids.length === 1 ? ids.at(0) : ids.join(',');
  }

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
