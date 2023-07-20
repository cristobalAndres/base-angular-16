import { CommonModule, formatDate } from '@angular/common';
import { Component, Input, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, finalize } from 'rxjs';
import { KycService, UpdateKycUserInformationDto } from '../../data-access';

@Component({
  selector: 'app-update-data-kyc-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-data-kyc-modal-form.html',
  styleUrls: ['./update-data-kyc-modal-form.scss'],
  providers: [KycService],
})
export class UpdateDataKYCModalFormComponent implements OnDestroy {
  private readonly kycService = inject(KycService);
  private updateKycInformationUserSubscription?: Subscription;

  @Input({ required: true }) title!: string;
  @Input({ required: true }) clientId!: string;
  @Input({ required: true }) activateModal!: NgbModalRef;

  firstName = '';
  lastName = '';
  date = new Date();
  gender = '';

  saveChanges() {
    const updateDto: UpdateKycUserInformationDto = {
      name: this.firstName,
      lastName: this.lastName,
      birthDate: formatDate(this.date, 'YYYYMMdd', 'en-US').toString(),
      gender: this.gender,
    };

    this.updateKycInformationUserSubscription = this.kycService
      .updateKycInformationUser(updateDto, this.clientId)
      .pipe(finalize(() => this.activateModal.close()))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.updateKycInformationUserSubscription?.unsubscribe();
  }
}
