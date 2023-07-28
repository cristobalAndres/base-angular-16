import { Injectable, inject } from '@angular/core';
import { TransactionsHttpService } from '@app/shared/services';
import { GetTransactionsCommonParamsDto } from '@app/shared/services/transactions';

@Injectable()
export class TransactionsService {
  private readonly transactionsHttpService = inject(TransactionsHttpService);

  getTransactions(getTransactionsParamsDto: GetTransactionsCommonParamsDto) {
    return this.transactionsHttpService.getTransactions(
      getTransactionsParamsDto,
    );
  }
}
