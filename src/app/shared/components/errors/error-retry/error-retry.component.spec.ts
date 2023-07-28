import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRetryComponent } from './error-retry.component';

describe('ErrorRetryComponent', () => {
  let component: ErrorRetryComponent;
  let fixture: ComponentFixture<ErrorRetryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorRetryComponent],
    });
    fixture = TestBed.createComponent(ErrorRetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
