import { TestBed } from '@angular/core/testing';
import { ServicesEpayService } from './services-epay.service';

describe('ServicesEpayService', () => {
  let service: ServicesEpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesEpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
