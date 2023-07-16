import { Injectable, inject } from '@angular/core';
import { TransactionsHttpService } from '@app/shared/services';
import { GetTransactionsParamsDto } from './dtos';

@Injectable()
export class TransactionsService {
  private readonly transactionsHttpService = inject(TransactionsHttpService);

  getTransactions(getTransactionsParamsDto: GetTransactionsParamsDto) {
    return this.transactionsHttpService.getTransactions(
      getTransactionsParamsDto,
    );
  }
}
