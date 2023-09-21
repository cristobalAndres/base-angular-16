import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NgHttpCachingHeaders } from 'ng-http-caching';
import { BehaviorSubject, switchMap } from 'rxjs';
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

  private readonly queryParams$ =
    new BehaviorSubject<FindAllCashInsQueryParamsDto>({
      ...FindAllCashInsService.INITIAL_QUERY_PARAMS,
    });

  readonly findAllCashIns$ = this.queryParams$.pipe(
    switchMap((queryParams) =>
      this.httpClient.get<readonly FindAllCashInsDto[]>('cash-ins', {
        params: queryParams,
        headers: { [NgHttpCachingHeaders.ALLOW_CACHE]: '1' },
      }),
    ),
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
