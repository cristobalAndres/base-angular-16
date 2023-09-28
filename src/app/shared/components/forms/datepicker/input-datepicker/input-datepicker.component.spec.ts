import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatepickerComponent } from './input-datepicker.component';

describe('InputDatepickerComponent', () => {
  let component: InputDatepickerComponent;
  let fixture: ComponentFixture<InputDatepickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputDatepickerComponent],
    });
    fixture = TestBed.createComponent(InputDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
