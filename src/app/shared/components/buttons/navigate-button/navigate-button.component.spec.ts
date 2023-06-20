import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigateButtonComponent } from './navigate-button.component';

describe('NavigateButtonComponent', () => {
  let component: NavigateButtonComponent;
  let fixture: ComponentFixture<NavigateButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavigateButtonComponent],
    });
    fixture = TestBed.createComponent(NavigateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
