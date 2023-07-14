import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeatilEcommercesTableComponent } from './client-deatil-ecommerces-table.component';

describe('UsersTableComponent', () => {
  let component: ClientDeatilEcommercesTableComponent;
  let fixture: ComponentFixture<ClientDeatilEcommercesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDeatilEcommercesTableComponent],
    });
    fixture = TestBed.createComponent(ClientDeatilEcommercesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
