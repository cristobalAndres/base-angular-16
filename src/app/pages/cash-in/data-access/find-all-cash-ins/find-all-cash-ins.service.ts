import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PaginatedDto } from '@app/shared/dtos';
import { ToastService } from '@app/shared/services';
import { ToastsColors } from '@app/shared/services/toasts';
import { NgHttpCachingHeaders } from 'ng-http-caching';
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';
import { FindAllCashInsDto, FindAllCashInsQueryParamsDto } from './dtos';

@Injectable({
  providedIn: 'root',
})
export class FindAllCashInsService {
  private static readonly INITIAL_QUERY_PARAMS: FindAllCashInsQueryParamsDto = {
    perPage: 10,
    currentPage: 1,
  };

  private readonly httpClient = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  private readonly queryParams$ =
    new BehaviorSubject<FindAllCashInsQueryParamsDto>({
      ...FindAllCashInsService.INITIAL_QUERY_PARAMS,
    });

  private readonly findAllCashIns$ = this.queryParams$.pipe(
    switchMap((queryParams) =>
      this.httpClient
        .get<PaginatedDto<FindAllCashInsDto>>('cash-ins', {
          params: queryParams,
          headers: { [NgHttpCachingHeaders.ALLOW_CACHE]: '1' },
        })
        .pipe(
          catchError(() => {
            this.toastService.show({
              body: 'Error al obtener cash ins',
              color: ToastsColors.DANGER,
            });

            return EMPTY;
          }),
        ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly cashIns$ = this.findAllCashIns$.pipe(map(({ data }) => data));
  readonly pagination$ = this.findAllCashIns$.pipe(
    map(({ pagination }) => pagination),
  );

  searchCashIns(search: NonNullable<FindAllCashInsQueryParamsDto['search']>) {
    this.queryParams$.next({
      ...FindAllCashInsService.INITIAL_QUERY_PARAMS,
      search,
    });
  }

  changePage(pageNumber: FindAllCashInsQueryParamsDto['currentPage']) {
    this.queryParams$.next({
      ...this.queryParams$.value,
      currentPage: pageNumber,
    });
  }
}
