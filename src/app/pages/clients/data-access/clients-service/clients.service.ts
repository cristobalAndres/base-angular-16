import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@app/shared/services';
import { ToastsColors } from '@app/shared/services/toasts';
import { environment } from '@environment';
import { NgHttpCachingHeaders } from 'ng-http-caching';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  map,
  merge,
  of,
  switchMap,
  tap,
} from 'rxjs';
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
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastService = inject(ToastService);

  private readonly accountDetailsReloader$ = new BehaviorSubject(undefined);
  private readonly accountDetailsUpdateBalanceParam$ = new BehaviorSubject(
    false,
  );

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

  private getAccountDetails(clientId: string, updateBalance = false) {
    return this.httpClient
      .get<AccountDetailsResponseDto>(
        `${environment.paymentDataBack}/account/${clientId}`,
        { params: { updateBalance } },
      )
      .pipe(catchError(() => of(void 0)));
  }

  readonly accDetails$ = this.activatedRoute.paramMap.pipe(
    map((params) => params?.get('id')),
    tap((id) => {
      if (!id) throw new Error('Client ID was not found in the route.');
    }),
    filter(Boolean),
    switchMap((id) =>
      merge(
        this.accountDetailsReloader$,
        this.accountDetailsUpdateBalanceParam$,
      ).pipe(
        switchMap((updateBalance) =>
          this.getAccountDetails(id, updateBalance).pipe(
            tap((balanceDto) => {
              if (!updateBalance) return;

              if (balanceDto)
                this.toastService.show({
                  body: 'El saldo se ha actualizado correctamente',
                });
              else
                this.toastService.show({
                  body: 'No se ha podido actualizar la información',
                  color: ToastsColors.DANGER,
                });
            }),
          ),
        ),
      ),
    ),
  );

  reloadAccountDetails() {
    this.accountDetailsReloader$.next(undefined);
  }

  updateBalance() {
    this.accountDetailsUpdateBalanceParam$.next(true);
  }

  blockClient(clientId: string) {
    return this.httpClient.post<ClientDto>(`/client/${clientId}/block`, {});
  }

  unBlockClient(clientId: string) {
    return this.httpClient.post<ClientDto>(`/client/${clientId}/unblock`, {});
  }
}
