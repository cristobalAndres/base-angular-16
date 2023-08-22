import { DatePipe } from '@angular/common';
import { inject } from '@angular/core';
import { TransactionModalDataDto } from '@app/pages/clients/shared/dtos/transaction-modal-data.dto';
import { TransactionDto } from '@app/shared/services/transactions';

export class TransactionMapper {
  private readonly datePipe = inject(DatePipe);

  mapDataFromTransaction(
    transaction: TransactionDto,
  ): TransactionModalDataDto[] {
    return [
      {
        title: 'Transacción ID',
        value: transaction.transaction_id,
      },
      {
        title: 'Fecha',
        value: this.datePipe.transform(transaction.date)?.toString(),
      },
      {
        title: 'Número de operación',
        value: transaction.authorization_code,
      },
      {
        title: 'Estado',
        value: transaction.status,
      },
      {
        title: 'Monto',
        value: `$ ${transaction.amount ?? ''}`,
      },
      {
        title: 'Descuento',
        value: `$ ${transaction.saving ?? ''}`,
      },
      {
        title: 'Total',
        value: `$ ${transaction.total ?? ''}`,
      },
      {
        title: 'Comercio',
        value: transaction.commerce_code,
      },
      {
        title: 'Método de pago',
        value: transaction.payment_method,
      },
      {
        title: 'Referencia ID',
        value: transaction.reference_id,
      },
      {
        title: 'Nombre sucursal',
        value: transaction.store_name,
      },
      {
        title: 'Caja',
        value: transaction.pos_id,
      },
      {
        title: 'Devolución',
        value: transaction.reference_id ? 'SÍ' : 'NO',
      },
      {
        title: 'Número de confirmación',
        value: transaction.confirmation_number,
      },
      {
        title: 'Orden de pago',
        value: transaction.buy_order,
      },
      {
        title: 'Tipo',
        value: transaction.type,
      },
      {
        title: 'Sub Tipo',
        value: transaction.sub_type,
      },
    ];
  }
}
