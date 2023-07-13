import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMethodsTableComponent } from './paymenths-methods-table.component';

describe('UsersTableComponent', () => {
  let component: PaymentsMethodsTableComponent;
  let fixture: ComponentFixture<PaymentsMethodsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsMethodsTableComponent],
    });
    fixture = TestBed.createComponent(PaymentsMethodsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
