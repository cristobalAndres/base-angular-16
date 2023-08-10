import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environment';
import { NgHttpCachingHeaders } from 'ng-http-caching';
import { Observable } from 'rxjs';
import {
  AccountDetailsResponseDto,
  CardsResponse,
  ClientDto,
  ClientParameter,
  ClientsResponseDto,
  GetClientsParams,
} from '../../shared';

@Injectable()
export class ClientsService {
  private readonly httpClient = inject(HttpClient);

  getClients(
    getClientsParams: GetClientsParams = {},
  ): Observable<ClientsResponseDto> {
    const {
      currentPage = 1,
      perPage = 10,
      searchParam = ClientParameter.EMAIL,
      search,
    } = getClientsParams;

    const filter = search ? this.createFilters(search, searchParam) : {};

    const httpParams = new HttpParams({
      fromObject: { ...filter, currentPage, perPage },
    });

    return this.httpClient.get<ClientsResponseDto>('customers', {
      params: httpParams,
      headers: { [NgHttpCachingHeaders.ALLOW_CACHE]: '1' },
    });
  }

  private createFilters(search: string, searchParam: ClientParameter) {
    switch (searchParam) {
      case ClientParameter.EMAIL:
        return { 'filter.email': `$sw:${search}` } as const;
      case ClientParameter.PHONE:
        return { 'filter.phoneNumber': `$ilike:${search}` } as const;
    }
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
}
