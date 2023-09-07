import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Auth } from 'aws-amplify';
import { Observable, from, map, switchMap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const isInternalRequest = [environment.apiReportUrl].some((baseUrl) =>
      request.url.startsWith(baseUrl),
    );

    // Avoid sending the access token to external APIs
    if (!isInternalRequest && request.url.startsWith('http'))
      return next.handle(request);

    return from(Auth.currentSession()).pipe(
      map((session) => session.getAccessToken()),
      map((accessToken) => accessToken.getJwtToken()),
      map((jwtAccessToken) =>
        this.addAuthorizationHeader(request, jwtAccessToken),
      ),
      switchMap((requestWithAuthorizationHeader) =>
        next.handle(requestWithAuthorizationHeader),
      ),
    );
  }

  private addAuthorizationHeader(
    request: HttpRequest<unknown>,
    jwtAccessToken: string,
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    });
  }
}
