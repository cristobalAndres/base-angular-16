import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environment';
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
      search = '',
      searchParam = ClientParameter.EMAIL,
      perPage = 10,
    } = getClientsParams;

    const httpParams = Object.entries({
      currentPage,
      search,
      searchParam,
      perPage,
    }).reduce((params, [key, value]) => {
      if (value !== undefined) params[key] ??= value;
      return params;
    }, {} as NonNullable<HttpParamsOptions['fromObject']>);

    return this.httpClient.get<ClientsResponseDto>('client', {
      params: new HttpParams({ fromObject: httpParams }),
    });
  }

  getClientDetail(clientId: string) {
    return this.httpClient.get<ClientDto>(`client/${clientId}`);
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
      {},
    );
  }
}
