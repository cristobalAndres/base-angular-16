import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environment';
import { ReportDataDto } from '../../shared/dtos';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly httpClient = inject(HttpClient);

  generateReport(data: ReportDataDto) {
    return this.httpClient.post(
      `${environment.apiReportUrl}/report/transactions`,
      data,
    );
  }
}