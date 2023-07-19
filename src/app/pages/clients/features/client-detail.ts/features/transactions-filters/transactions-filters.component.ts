import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { SelectionDto } from '@app/shared/components/forms';
import { TransactionStatusPipe, TransactionTypePipe } from '@app/shared/pipes';
import {
  TransactionStatus,
  TransactionType,
} from '@app/shared/services/transactions';
import { TransactionsFiltersService } from '../../data-access/transactions-filter-service';

@Component({
  selector: 'app-transactions-filters',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule],
  templateUrl: './transactions-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFiltersComponent {
  private readonly transactionsFiltersService = inject(
    TransactionsFiltersService,
  );

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
}
