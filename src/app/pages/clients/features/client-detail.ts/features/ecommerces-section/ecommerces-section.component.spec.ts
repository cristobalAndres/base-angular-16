import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommercesSectionComponent } from './ecommerces-section.component';

describe('EcommercesSectionComponent', () => {
  let component: EcommercesSectionComponent;
  let fixture: ComponentFixture<EcommercesSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcommercesSectionComponent],
    });
    fixture = TestBed.createComponent(EcommercesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
