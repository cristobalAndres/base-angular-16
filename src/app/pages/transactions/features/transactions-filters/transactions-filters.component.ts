import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedModule } from '@app/shared';
import { SelectionDto } from '@app/shared/components/forms';
import { TransactionStatusPipe } from '@app/shared/pipes';
import { TransactionStatus } from '@app/shared/services/transactions';
import { TransactionsFiltersService } from '../../data-access';

@Component({
  selector: 'app-transactions-filters',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './transactions-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFiltersComponent {
  private readonly transactionsFiltersService = inject(
    TransactionsFiltersService,
  );

  protected readonly statusOptions: SelectionDto<TransactionStatus>[] =
    Object.values(TransactionStatus).map((transactionStatus) => ({
      value: transactionStatus,
      label: TransactionStatusPipe.TRANSACTION_STATUSES[transactionStatus],
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
}
