import { TestBed } from '@angular/core/testing';

import { ServicesMonitorService } from './services-monitor.service';

describe('ServicesMonitorService', () => {
  let service: ServicesMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
