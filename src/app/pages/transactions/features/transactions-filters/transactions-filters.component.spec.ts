import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsFiltersComponent } from './transactions-filters.component';

describe('TransactionsFiltersComponent', () => {
  let component: TransactionsFiltersComponent;
  let fixture: ComponentFixture<TransactionsFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransactionsFiltersComponent],
    });
    fixture = TestBed.createComponent(TransactionsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
