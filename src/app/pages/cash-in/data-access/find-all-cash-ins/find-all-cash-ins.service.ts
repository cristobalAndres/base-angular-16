import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PaginatedDto } from '@app/shared/dtos';
import { NgHttpCachingHeaders } from 'ng-http-caching';
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  finalize,
  map,
  shareReplay,
  switchMap,
  tap,
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

  private readonly queryParams$ =
    new BehaviorSubject<FindAllCashInsQueryParamsDto>({
      ...FindAllCashInsService.INITIAL_QUERY_PARAMS,
    });

  private readonly findAllCashIns$ = this.queryParams$.pipe(
    tap(() => this.isLoading$.next(true)),
    tap(() => this.hasError$.next(false)),
    switchMap((queryParams) =>
      this.httpClient
        .get<PaginatedDto<FindAllCashInsDto>>('cash-ins', {
          params: queryParams,
          headers: { [NgHttpCachingHeaders.ALLOW_CACHE]: '1' },
        })
        .pipe(
          finalize(() => this.isLoading$.next(false)),
          catchError(() => {
            this.hasError$.next(true);

            return EMPTY;
          }),
          tap(() => this.hasError$.next(false)),
        ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly cashIns$ = this.findAllCashIns$.pipe(map(({ data }) => data));
  readonly pagination$ = this.findAllCashIns$.pipe(
    map(({ pagination }) => pagination),
  );
  readonly isLoading$ = new BehaviorSubject<boolean>(true);
  readonly hasError$ = new BehaviorSubject<boolean>(false);

  searchCashIns(search?: FindAllCashInsQueryParamsDto['search']) {
    if (!search) {
      this.queryParams$.next({ ...FindAllCashInsService.INITIAL_QUERY_PARAMS });
      return;
    }

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

  retry() {
    this.queryParams$.next({ ...this.queryParams$.value });
  }
}
