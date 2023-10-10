import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GetTransactionsCommonParamsDto,
  TransactionsResponseDto,
} from './dtos';
import { TransactionPayMethod, TransactionStatus } from './enums';

@Injectable({ providedIn: 'root' })
export class TransactionsHttpService {
  private readonly httpClient = inject(HttpClient);

  getTransactions(
    getTransactionsCommonParamsDto: GetTransactionsCommonParamsDto = {},
  ): Observable<TransactionsResponseDto> {
    const {
      currentPage = 1,
      statusFilter = TransactionStatus.ALL,
      payMethodFilter = TransactionPayMethod.ALL,
      perPage = 10,
      startDate,
      endDate,
      storeName,
      posId,
      clienteId,
      userId,
    } = getTransactionsCommonParamsDto;

    const httpParams = Object.entries({
      ...getTransactionsCommonParamsDto,
      perPage,
      currentPage,
      statusFilter,
      payMethodFilter,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      storeName,
      posId,
      clienteId,
      userId,
    }).reduce((params, [key, value]) => {
      if (value !== undefined) params[key] ??= value;
      return params;
    }, {} as NonNullable<HttpParamsOptions['fromObject']>);

    return this.httpClient.get<TransactionsResponseDto>('transaction', {
      params: new HttpParams({ fromObject: httpParams }),
    });
  }
}
