import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgHttpCachingHeaders } from 'ng-http-caching';
import { ResponseTransactionEpayDto } from '../transactions/dtos/response-transacion-epay.dto';

export class ServicesEpayService {
  private readonly httpClient = inject(HttpClient);

  getEpayTransactionDetails(transactionId: string) {
    return this.httpClient.get<ResponseTransactionEpayDto[]>(
      `/epay-transactions/${transactionId}`,
      { headers: { [NgHttpCachingHeaders.ALLOW_CACHE]: '1' } },
    );
  }
}
