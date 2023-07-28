import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMethodsSectionComponent } from './payments-methods-section.component';

describe('PaymentsMethodsSectionComponent', () => {
  let component: PaymentsMethodsSectionComponent;
  let fixture: ComponentFixture<PaymentsMethodsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsMethodsSectionComponent],
    });
    fixture = TestBed.createComponent(PaymentsMethodsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
