import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class ApiBaseUrlInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('http')) return next.handle(request);

    const apiRequestUrl = `${environment.apiUrl}${
      request.url.startsWith('/') ? request.url : `/${request.url}`
    }`;

    const apiRequest = request.clone({ url: apiRequestUrl });

    return next.handle(apiRequest);
  }
}
