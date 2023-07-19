import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsDetailModalComponent } from './transactions-detail-modal.component';

describe('TransactionsDetailModalComponent', () => {
  let component: TransactionsDetailModalComponent;
  let fixture: ComponentFixture<TransactionsDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsDetailModalComponent],
    });
    fixture = TestBed.createComponent(TransactionsDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});