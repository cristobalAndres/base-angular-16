import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MonitorResponseDto } from './dtos';

@Injectable({
  providedIn: 'root',
})
export class ServicesMonitorService {
  private readonly httpClient = inject(HttpClient);

  getStatusServices() {
    return this.httpClient.get<MonitorResponseDto>('/monitor');
  }
}
