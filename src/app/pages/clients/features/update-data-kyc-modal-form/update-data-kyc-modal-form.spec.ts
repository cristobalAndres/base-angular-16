import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateDataKYCModalFormComponent } from './update-data-kyc-modal-form.component';

describe('UpdateDataKYCModalFormComponent', () => {
  let component: UpdateDataKYCModalFormComponent;
  let fixture: ComponentFixture<UpdateDataKYCModalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDataKYCModalFormComponent],
    });
    fixture = TestBed.createComponent(UpdateDataKYCModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
