import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTransactionsTableComponent } from './client-transactions-table.component';

describe('ClientTransactionsTableComponent', () => {
  let component: ClientTransactionsTableComponent;
  let fixture: ComponentFixture<ClientTransactionsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientTransactionsTableComponent],
    });
    fixture = TestBed.createComponent(ClientTransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
