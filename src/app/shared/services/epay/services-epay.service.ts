import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResponseTransactionEpayDto } from '../transactions/dtos/response-transacion-epay.dto';

export class ServicesEpayService {
  private readonly httpClient = inject(HttpClient);

  getEpayTransactionDetails(transactionId: string) {
    return this.httpClient.get<ResponseTransactionEpayDto[]>(
      `/epay-transactions/${transactionId}`,
    );
  }
}
