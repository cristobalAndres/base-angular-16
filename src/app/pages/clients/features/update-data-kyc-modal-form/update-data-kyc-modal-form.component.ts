import { CommonModule, formatDate } from '@angular/common';
import { Component, Input, OnDestroy, inject, signal } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '@app/shared';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, finalize } from 'rxjs';
import { KycService, UpdateKycUserInformationDto } from '../../data-access';

@Component({
  selector: 'app-update-data-kyc-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './update-data-kyc-modal-form.html',
  styleUrls: ['./update-data-kyc-modal-form.scss'],
  providers: [KycService],
})
export class UpdateDataKYCModalFormComponent implements OnDestroy {
  private readonly kycService = inject(KycService);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  @Input({ required: true }) title!: string;
  @Input({ required: true }) clientId!: string;
  @Input({ required: true }) modalRef!: NgbModalRef;

  private updateKycInformationUserSubscription?: Subscription;
  protected readonly isSubmitting = signal(false);

  protected readonly updateKycUserInformationForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: new FormControl<Date | null>(null, Validators.required),
    gender: ['', Validators.required],
  } satisfies Record<keyof UpdateKycUserInformationDto, unknown>);

  ngOnDestroy() {
    this.updateKycInformationUserSubscription?.unsubscribe();
  }

  protected saveChanges() {
    if (this.updateKycUserInformationForm.invalid) {
      this.updateKycUserInformationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const updateDto = this.mapUpdateKycUserInformationDto();

    this.updateKycInformationUserSubscription = this.kycService
      .updateKycInformationUser(updateDto, this.clientId)
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
          this.modalRef.close();
        }),
      )
      .subscribe();
  }

  protected getControl<TControlName extends keyof UpdateKycUserInformationDto>(
    controlName: TControlName,
  ) {
    return this.updateKycUserInformationForm.controls[controlName];
  }

  protected isInvalidControl(controlName: keyof UpdateKycUserInformationDto) {
    const control = this.getControl(controlName);

    return control.invalid && (control.touched || control.dirty);
  }

  protected hasError(
    controlName: keyof UpdateKycUserInformationDto,
    errorName: string,
  ) {
    return (
      this.isInvalidControl(controlName) &&
      this.getControl(controlName).hasError(errorName)
    );
  }

  private mapUpdateKycUserInformationDto(): UpdateKycUserInformationDto {
    const birthDate = this.getControl('birthDate').value;
    if (!birthDate) throw new Error('Birth date is required');

    return {
      name: this.getControl('name').value,
      gender: this.getControl('gender').value,
      lastName: this.getControl('lastName').value,
      birthDate: formatDate(birthDate, 'YYYYMMdd', 'en-US'),
    };
  }
}
