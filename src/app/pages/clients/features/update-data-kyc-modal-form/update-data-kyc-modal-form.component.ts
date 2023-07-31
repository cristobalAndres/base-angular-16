import { CommonModule, formatDate } from '@angular/common';
import { Component, Input, OnDestroy, inject, signal } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '@app/shared';
import { ToastsColors } from '@app/shared/services/toasts/enums';
import { ToastService } from '@app/shared/services/toasts/toast-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
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
  private readonly modalService = inject(NgbModal);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  private readonly toastService = inject(ToastService);

  @Input({ required: true }) title!: string;
  @Input({ required: true }) clientId!: string;

  private updateKycInformationUserSubscription?: Subscription;
  protected readonly isSubmitting = signal(false);

  protected readonly updateKycUserInformationForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: new FormControl<Date | null>(null, Validators.required),
    gender: ['', Validators.required],
  });

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
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.closeModal();
          this.toastService.show(
            'Se ha actualizado la información correctamente',
            ToastsColors.SUCCESS,
          );
        },
        error: () => {
          this.isSubmitting.set(false);
          this.toastService.show(
            'No se ha podido actualizar la información',
            ToastsColors.DANGER,
          );
        },
      });
  }

  protected closeModal() {
    this.modalService.dismissAll();
  }

  protected getControl<
    TControlName extends keyof typeof this.updateKycUserInformationForm.controls,
  >(controlName: TControlName) {
    return this.updateKycUserInformationForm.controls[controlName];
  }

  protected isInvalidControl(
    controlName: keyof typeof this.updateKycUserInformationForm.controls,
  ) {
    const control = this.getControl(controlName);

    return control.invalid && (control.touched || control.dirty);
  }

  protected hasError(
    controlName: keyof typeof this.updateKycUserInformationForm.controls,
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
