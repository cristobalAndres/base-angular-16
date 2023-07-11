import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPhotoInfoComponent } from './card-photo-info.component';

describe('CardPhotoInfoComponent', () => {
  let component: CardPhotoInfoComponent;
  let fixture: ComponentFixture<CardPhotoInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPhotoInfoComponent],
    });
    fixture = TestBed.createComponent(CardPhotoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
