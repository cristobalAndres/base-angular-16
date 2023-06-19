import { TestBed } from '@angular/core/testing';

import { ApiBaseUrlInterceptor } from './api-base-url.interceptor';

describe('ApiBaseUrlInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ApiBaseUrlInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: ApiBaseUrlInterceptor = TestBed.inject(
      ApiBaseUrlInterceptor,
    );

    expect(interceptor).toBeTruthy();
  });
});
