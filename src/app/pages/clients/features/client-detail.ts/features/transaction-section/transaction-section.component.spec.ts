import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSectionComponent } from './transaction-section.component';

describe('TransactionComponent', () => {
  let component: TransactionSectionComponent;
  let fixture: ComponentFixture<TransactionSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionSectionComponent],
    });
    fixture = TestBed.createComponent(TransactionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
