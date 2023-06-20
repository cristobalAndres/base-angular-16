import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GetTransactionsParams,
  TransactionsResponseDto,
  TransactionStatus,
} from '../../shared';

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
      startDate,
      endDate,
    } = getTransactionsParams;

    const httpParams = Object.entries({
      perPage,
      currentPage,
      statusFilter,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    }).reduce((params, [key, value]) => {
      if (value !== undefined) params[key] ??= value;
      return params;
    }, {} as NonNullable<HttpParamsOptions['fromObject']>);

    return this.httpClient.get<TransactionsResponseDto>('transaction', {
      params: new HttpParams({ fromObject: httpParams }),
    });
  }
}
