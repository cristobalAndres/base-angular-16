import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { IconButtonComponent } from '@app/shared/components/buttons';
import {
  RangeDatepickerComponent,
  SelectComponent,
  SelectionDto,
} from '@app/shared/components/forms';
import { TransactionStatusPipe, TransactionTypePipe } from '@app/shared/pipes';
import {
  TransactionStatus,
  TransactionType,
} from '@app/shared/services/transactions';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsFiltersService } from '../../data-access/transactions-filter-service';

@Component({
  selector: 'app-transactions-filters',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbTooltip,
    IconButtonComponent,
  ],
  templateUrl: './transactions-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFiltersComponent {
  private readonly transactionsFiltersService = inject(
    TransactionsFiltersService,
  );

  @ViewChild(RangeDatepickerComponent)
  rangeDatePickerComponent!: RangeDatepickerComponent;

  @ViewChildren(SelectComponent)
  selectComponents!: QueryList<SelectComponent>;

  protected amount = '';

  protected readonly statusOptions: SelectionDto<TransactionStatus>[] =
    Object.values(TransactionStatus).map((transactionStatus) => ({
      value: transactionStatus,
      label: TransactionStatusPipe.TRANSACTION_STATUSES[transactionStatus],
    }));

  protected readonly typeOptions: SelectionDto<TransactionType>[] =
    Object.values(TransactionType).map((transactionType) => ({
      value: transactionType,
      label: TransactionTypePipe.TRANSACTION_TYPES[transactionType],
    }));

  protected onStartDateChange(date: Date | undefined) {
    this.transactionsFiltersService.updateTransactionsFilters({
      startDate: date,
    });
  }

  protected onEndDateChange(date: Date | undefined) {
    this.transactionsFiltersService.updateTransactionsFilters({
      endDate: date,
    });
  }

  protected onStatusChange(status: TransactionStatus | undefined) {
    this.transactionsFiltersService.updateTransactionsFilters({
      statusFilter: status,
    });
  }

  protected onTypeChange(type: TransactionType | undefined) {
    this.transactionsFiltersService.updateTransactionsFilters({
      transactionType: type,
    });
  }

  protected onAmountChange() {
    if (!this.amount) {
      return this.transactionsFiltersService.deleteAmountInTransactionFilters();
    }
    this.transactionsFiltersService.updateTransactionsFilters({
      amount: +this.amount,
    });
  }

  protected filtersReset() {
    this.amount = '';
    this.onAmountChange();
    this.rangeDatePickerComponent.reset();
    this.selectComponents.toArray().forEach((selectComponent) => {
      selectComponent.reset();
    });
  }
}
