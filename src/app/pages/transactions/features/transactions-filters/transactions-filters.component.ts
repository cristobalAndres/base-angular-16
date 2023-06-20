import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { TransactionsFiltersService } from '../../data-access';
import { TransactionStatus } from '../../shared';
import { SelectionDto } from '@app/shared/components/forms';

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

  protected readonly statusOptions: SelectionDto<TransactionStatus>[] = [
    { value: TransactionStatus.ALL, label: 'Todos' },
    { value: TransactionStatus.CONFIRMED, label: 'Confirmado' },
    {
      value: TransactionStatus.REJECTED_BY_USER,
      label: 'Rechazado por usuario',
    },
    {
      value: TransactionStatus.INIT_TRANSACTION,
      label: 'Transacción iniciada',
    },
    { value: TransactionStatus.REVERSED, label: 'Reversado' },
    { value: TransactionStatus.REJECTED, label: 'Rechazado' },
    {
      value: TransactionStatus.NOTIFICATION_SUCCESS,
      label: 'Notificación exitosa',
    },
  ];

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
