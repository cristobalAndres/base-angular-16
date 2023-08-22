import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { PaymentsMethodsType } from '@app/pages/clients/shared';
import { TransactionModalDataDto } from '@app/pages/clients/shared/dtos/transaction-modal-data.dto';
import { TransactionsTableComponent } from '@app/pages/transactions/ui';
import { SpinnerComponent } from '@app/shared/components/loaders/spinner';
import { PaginationComponent } from '@app/shared/components/tables';
import { ServicesEpayService } from '@app/shared/services/epay';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  shareReplay,
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
import { TransactionsDetailModalComponent } from '../../ui/transactions-detail-modal/transactions-detail-modal.component';
import { TransactionsFiltersComponent } from '../transactions-filters';
import { EpayTransactionMapper } from './mappers/epay-transaction-mapper';
import { TransactionMapper } from './mappers/transaction-mappper';

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
  providers: [DatePipe],
  selector: 'app-transaction-section',
  templateUrl: './transaction-section.component.html',
  styleUrls: ['./transaction-section.component.scss'],
})
export class TransactionSectionComponent {
  private readonly datePipe = inject(DatePipe);
  private paymentsMethodsDataService = inject(PaymentMethodsDataService);
  private clientDataService = inject(ClientsDataService);
  private modalService = inject(NgbModal);

  protected readonly paymentsMethodsResponse =
    this.paymentsMethodsDataService.paymentsMethodsResponse;
  protected readonly isPaymentMethodsLoading =
    this.paymentsMethodsDataService.isLoading;

  private static readonly ITEMS_PER_PAGE = 10;

  private readonly transactionsService = inject(TransactionsService);
  private readonly transactionsFilters = inject(TransactionsFiltersService);

  private readonly servicesEpayService = inject(ServicesEpayService);

  private readonly currentPageSubject = new BehaviorSubject(1);
  protected readonly currentPage$ = this.currentPageSubject.asObservable();

  protected readonly epayTransactionMapper = inject(EpayTransactionMapper);
  protected readonly transactionMapper = inject(TransactionMapper);

  private readonly isLoadingSubject = new BehaviorSubject(false);
  protected readonly isLoading = toSignal(this.isLoadingSubject);

  private readonly transactionsApi$ = combineLatest([
    this.transactionsFilters.transactionsFilters$,
    this.currentPageSubject,
    toObservable(this.clientDataService.client),
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
    shareReplay(1),
  );

  protected readonly transactionsSig = toSignal(
    this.transactionsApi$.pipe(map(({ transactions }) => transactions)),
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

  protected readonly paginationSig = toSignal(
    this.pagination$.pipe(map((pagination) => pagination)),
  );

  protected onCurrentPageChange(currentPage: number) {
    this.currentPageSubject.next(currentPage);
  }

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

  protected onDetailButtonClick(transactionId: string) {
    const epayDataMapped: TransactionModalDataDto[] = [];
    this.servicesEpayService
      .getEpayTransactionDetails(transactionId)
      .subscribe((result) => {
        epayDataMapped.push(
          ...this.epayTransactionMapper.mapDataFromEpayTransaction(result[0]),
        );
      });

    const transactionsSub = this.transactionsApi$.subscribe((response) => {
      const modalRef = this.modalService.open(
        TransactionsDetailModalComponent,
        {
          size: 'lg',
          centered: true,
        },
      );

      if (
        this.updateInstanceOfTransactionDetailModalCompponent(
          modalRef.componentInstance,
        )
      ) {
        modalRef.componentInstance.activateModal = modalRef;
        modalRef.componentInstance.epayData = epayDataMapped;
        modalRef.componentInstance.transactionData = response.transactions
          .filter((transaction) => transaction.transaction_id === transactionId)
          .map((transaction) =>
            this.transactionMapper.mapDataFromTransaction(transaction),
          )
          .at(0) as TransactionModalDataDto[];
      }

      modalRef.result.then(
        () => {
          transactionsSub.unsubscribe();
        },
        () => {
          transactionsSub.unsubscribe();
        },
      );
    });
  }

  private updateInstanceOfTransactionDetailModalCompponent(
    componentIntance: unknown,
  ): componentIntance is TransactionsDetailModalComponent {
    return componentIntance instanceof TransactionsDetailModalComponent;
  }
}
