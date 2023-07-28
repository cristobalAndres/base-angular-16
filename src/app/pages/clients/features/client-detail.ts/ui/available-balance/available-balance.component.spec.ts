import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBalanceComponent } from './available-balance.component';

describe('AvailableBalanceComponent', () => {
  let component: AvailableBalanceComponent;
  let fixture: ComponentFixture<AvailableBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableBalanceComponent],
    });
    fixture = TestBed.createComponent(AvailableBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
