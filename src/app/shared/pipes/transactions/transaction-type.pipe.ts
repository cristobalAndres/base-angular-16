import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from '@app/shared/services/transactions';

@Pipe({
  name: 'transactionType',
  standalone: true,
})
export class TransactionTypePipe implements PipeTransform {
  static readonly TRANSACTION_TYPES: Record<TransactionType, string> = {
    [TransactionType.PAYMENT]: 'Pago',
    [TransactionType.CASH_IN]: 'Cash In',
    [TransactionType.CASH_OUT]: 'Cash Out',
    [TransactionType.REFUND]: 'Devolución',
    [TransactionType.ALL]: 'Todos',
  };

  transform(transactionType?: TransactionType): string | undefined {
    if (!transactionType) return;

    return (
      TransactionTypePipe.TRANSACTION_TYPES[transactionType] ?? transactionType
    );
  }
}
