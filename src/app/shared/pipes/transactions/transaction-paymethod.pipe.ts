import { Pipe, PipeTransform } from '@angular/core';
import { TransactionPayMethod } from '@app/shared/services/transactions';

@Pipe({
  name: 'transactionPayMethod',
  standalone: true,
})
export class TransactionPayMethodPipe implements PipeTransform {
  static readonly TRANSACTION_PAYMETHODS: Record<TransactionPayMethod, string> =
    {
      [TransactionPayMethod.ALL]: 'Todos',
      [TransactionPayMethod.CENCOSUD]: 'Cencosud Scotiabank',
      [TransactionPayMethod.CREDIT]: 'Crédito',
      [TransactionPayMethod.DEBIT]: 'Débito',
      [TransactionPayMethod.PREPAID]: 'Prepago',
      [TransactionPayMethod.SVA]: 'SVA',
      [TransactionPayMethod.UNKNOW]: 'Unknow',
      [TransactionPayMethod.NULL]: 'Nulo',
    };

  transform(transactionPayMethod?: TransactionPayMethod): string | undefined {
    if (!transactionPayMethod) return;

    return (
      TransactionPayMethodPipe.TRANSACTION_PAYMETHODS[transactionPayMethod] ??
      transactionPayMethod
    );
  }
}
