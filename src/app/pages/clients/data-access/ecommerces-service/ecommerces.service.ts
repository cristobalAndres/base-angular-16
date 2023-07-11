import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EcommerceResponseDto, GetEcommercesParams } from '../../shared';

@Injectable()
export class EcommercesService {
  private readonly httpClient = inject(HttpClient);

  getEcommerces(
    clientId: string,
    getEcommercesParams: GetEcommercesParams = {},
  ): Observable<EcommerceResponseDto | null> {
    if (!clientId) {
      throw new Error('clientId is required');
    }

    const { currentPage = getEcommercesParams.currentPage, perPage = 5 } =
      getEcommercesParams;

    const httpParams = Object.entries({
      currentPage,
      perPage,
    }).reduce((params, [key, value]) => {
      if (value !== undefined) params[key] ??= value;
      return params;
    }, {} as NonNullable<HttpParamsOptions['fromObject']>);

    return this.httpClient.get<EcommerceResponseDto>(`ecommerce/${clientId}`, {
      params: new HttpParams({ fromObject: httpParams }),
    });
  }
}
