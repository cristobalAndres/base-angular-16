import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environment';
import { NgHttpCachingHeaders } from 'ng-http-caching';
import { Observable } from 'rxjs';
import {
  AccountDetailsResponseDto,
  CardsResponse,
  ClientDto,
  ClientsResponseDto,
  GetClientsParams,
} from '../../shared';

@Injectable()
export class ClientsService {
  private readonly httpClient = inject(HttpClient);

  getClients(
    getClientsParams: GetClientsParams = {},
  ): Observable<ClientsResponseDto> {
    const { currentPage = 1, perPage = 10, search } = getClientsParams;

    const params = Object.entries({ search, currentPage, perPage }).reduce(
      (httpParams, [key, value]) =>
        value ? httpParams.set(key, value) : httpParams,
      new HttpParams(),
    );

    return this.httpClient.get<ClientsResponseDto>('customers', {
      params,
      headers: { [NgHttpCachingHeaders.ALLOW_CACHE]: '1' },
    });
  }

  getClientDetail(customerId: string) {
    return this.httpClient.get<ClientDto>(`customers/${customerId}`);
  }

  clientSignOut(clientId: string) {
    return this.httpClient.post(`/client/${clientId}/sign-out`, {});
  }

  getCards(clientId: string) {
    return this.httpClient.get<CardsResponse>(`/card/${clientId}`, {});
  }

  getAccountDetails(clientId: string) {
    return this.httpClient.get<AccountDetailsResponseDto>(
      `${environment.paymentDataBack}/account/${clientId}`,
    );
  }

  blockClient(clientId: string) {
    return this.httpClient.post<ClientDto>(`/client/${clientId}/block`, {});
  }

  unBlockClient(clientId: string) {
    return this.httpClient.post<ClientDto>(`/client/${clientId}/unblock`, {});
  }
}
