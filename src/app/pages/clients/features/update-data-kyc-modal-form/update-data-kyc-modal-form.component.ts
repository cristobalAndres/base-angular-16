import { CommonModule, formatDate } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '@app/shared';
import { ToastService } from '@app/shared/services';
import { ToastsColors } from '@app/shared/services/toasts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { KycService, UpdateKycUserInformationDto } from '../../data-access';

@Component({
  selector: 'app-update-data-kyc-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './update-data-kyc-modal-form.html',
  styleUrls: ['./update-data-kyc-modal-form.scss'],
  providers: [KycService],
})
export class UpdateDataKYCModalFormComponent {
  private readonly kycService = inject(KycService);
  private readonly modalService = inject(NgbModal);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly toastService = inject(ToastService);

  @Input({ required: true }) title!: string;
  @Input({ required: true }) clientId!: string;

  protected readonly isSubmitting = signal(false);
  protected readonly updateKycUserInformationForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: new FormControl<Date | null>(null, Validators.required),
    gender: ['', Validators.required],
  });

  protected saveChanges() {
    if (this.updateKycUserInformationForm.invalid) {
      this.updateKycUserInformationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const updateDto = this.mapUpdateKycUserInformationDto();

    this.kycService
      .updateKycInformationUser(updateDto, this.clientId)
      .pipe(
        finalize(() => this.isSubmitting.set(false)),
        catchError((error: unknown) => {
          this.toastService.show({
            body: 'No se ha podido actualizar la información',
            color: ToastsColors.DANGER,
          });

          return throwError(() => error);
        }),
        tap(() =>
          this.toastService.show({
            body: 'Se ha actualizado la información correctamente',
            color: ToastsColors.SUCCESS,
          }),
        ),
        tap(() => this.closeModal()),
      )
      .subscribe();
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
