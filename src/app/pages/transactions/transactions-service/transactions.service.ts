import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTransactionsParams, TransactionsResponseDto } from '../dtos';
import { TransactionStatus } from '../enums';

@Injectable()
export class TransactionsService {
  private readonly httpClient = inject(HttpClient);

  getTransactions(
    getTransactionsParams: GetTransactionsParams = {},
  ): Observable<TransactionsResponseDto> {
    const {
      currentPage = 1,
      statusFilter = TransactionStatus.ALL,
      perPage = 10,
    } = getTransactionsParams;

    const httpParams: HttpParamsOptions['fromObject'] = {
      perPage,
      currentPage,
      statusFilter,
    };

    return this.httpClient.get<TransactionsResponseDto>('transaction', {
      params: new HttpParams({ fromObject: httpParams }),
    });
  }
}
