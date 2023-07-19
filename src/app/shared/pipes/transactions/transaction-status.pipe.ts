import { Pipe, PipeTransform } from '@angular/core';
import { TransactionStatus } from '@app/shared/services/transactions';

@Pipe({
  name: 'transactionStatus',
  standalone: true,
})
export class TransactionStatusPipe implements PipeTransform {
  static readonly TRANSACTION_STATUSES: Record<TransactionStatus, string> = {
    [TransactionStatus.ALL]: 'Todos',
    [TransactionStatus.CONFIRMED]: 'Confirmado',
    [TransactionStatus.REJECTED_BY_USER]: 'Rechazado por usuario',
    [TransactionStatus.INIT_TRANSACTION]: 'Transacción iniciada',
    [TransactionStatus.REVERSED]: 'Reversado',
    [TransactionStatus.REJECTED]: 'Rechazado',
    [TransactionStatus.NOTIFICATION_SUCCESS]: 'Notificación exitosa',
  };

  transform(transactionStatus?: TransactionStatus): string | undefined {
    if (!transactionStatus) return;

    return (
      TransactionStatusPipe.TRANSACTION_STATUSES[transactionStatus] ??
      transactionStatus
    );
  }
}
