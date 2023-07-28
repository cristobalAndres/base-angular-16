import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailModalComponent } from './account-detail-modal';
describe('AccountDetailModalComponent', () => {
  let component: AccountDetailModalComponent;
  let fixture: ComponentFixture<AccountDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDetailModalComponent],
    });
    fixture = TestBed.createComponent(AccountDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
