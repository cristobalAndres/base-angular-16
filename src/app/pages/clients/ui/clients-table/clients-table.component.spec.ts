import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTableComponent } from './clients-table.component';

describe('UsersTableComponent', () => {
  let component: ClientsTableComponent;
  let fixture: ComponentFixture<ClientsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsTableComponent],
    });
    fixture = TestBed.createComponent(ClientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
