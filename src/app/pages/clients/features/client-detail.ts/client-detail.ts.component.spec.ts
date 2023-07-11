import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailTsComponent } from './client-detail.ts.component';

describe('ClientDetailTsComponent', () => {
  let component: ClientDetailTsComponent;
  let fixture: ComponentFixture<ClientDetailTsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDetailTsComponent],
    });
    fixture = TestBed.createComponent(ClientDetailTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
