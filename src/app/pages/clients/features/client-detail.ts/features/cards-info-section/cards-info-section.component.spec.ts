import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsInfoSectionComponent } from './cards-info-section.component';

describe('CardsInfoSectionComponent', () => {
  let component: CardsInfoSectionComponent;
  let fixture: ComponentFixture<CardsInfoSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsInfoSectionComponent],
    });
    fixture = TestBed.createComponent(CardsInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
