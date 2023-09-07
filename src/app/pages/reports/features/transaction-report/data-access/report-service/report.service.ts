import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environment';
import { Auth } from 'aws-amplify';
import { from, map, mergeMap } from 'rxjs';
import { ReportDataDto } from '../../shared/dtos';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly httpClient = inject(HttpClient);

  generateReport(data: ReportDataDto) {
    return from(Auth.currentSession()).pipe(
      map((session) => session.getAccessToken()),
      map((accessToken) => accessToken.getJwtToken()),
      map((jwtAccessToken) => jwtAccessToken),
      mergeMap((jwtAccessToken) => {
        return this.httpClient.post(
          `${environment.apiReportUrl}/report/transactions`,
          data,
          {
            headers: {
              Authorization: `Bearer ${jwtAccessToken}`,
            },
          },
        );
      }),
    );
  }
}
