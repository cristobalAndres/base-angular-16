import { TransactionModalDataDto } from '@app/pages/clients/shared/dtos/transaction-modal-data.dto';
import { ResponseTransactionEpayDto } from '@app/shared/services/transactions/dtos/response-transacion-epay.dto';

export class EpayTransactionMapper {
  mapDataFromEpayTransaction(
    transaction: ResponseTransactionEpayDto,
  ): TransactionModalDataDto[] {
    if (transaction) {
      return [
        {
          title: 'Transaccion ID',
          value: transaction.transaction_id,
        },
        {
          title: 'FK Card ID',
          value: transaction.fk_card_id.toString(),
        },
        {
          title: 'Commerce Order Id',
          value: transaction.commerce_order_id,
        },
        {
          title: 'Updated At',
          value: transaction.updated_at,
        },
        {
          title: 'Added at',
          value: transaction.added_at,
        },
        {
          title: 'Status',
          value: transaction.status,
        },
        {
          title: 'Capture Auth Code',
          value: transaction.capture_auth_code,
        },
        {
          title: 'Auth Code',
          value: transaction.auth_code,
        },
        {
          title: 'Capture Value',
          value: transaction.capture_value.toString(),
        },
        {
          title: 'Balance',
          value: transaction.balance.toString(),
        },
        {
          title: 'Transfer Ok At',
          value: transaction.transfer_ok_at,
        },
        {
          title: 'RefunableBalance',
          value: transaction.refundable_balance.toString(),
        },
        {
          title: 'Link ID',
          value: transaction.link_id?.toString(),
        },
        {
          title: 'Params Payment Method',
          value: transaction.params.payment_method,
        },
        {
          title: 'Params Acquirer',
          value: transaction.params.acquirer,
        },
        {
          title: 'Params Card Token ID',
          value: transaction.params.card_token_id,
        },
        {
          title: 'Params Response Code',
          value: transaction.params.response_code.toString(),
        },
        {
          title: 'Params Response Message',
          value: transaction.params.response_message,
        },
        {
          title: 'Params Payment Status',
          value: transaction.params.status,
        },
        {
          title: 'Params Message',
          value: transaction.params.message,
        },
      ];
    }
    return [];
  }
}
