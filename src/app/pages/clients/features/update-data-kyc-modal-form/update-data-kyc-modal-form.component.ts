import { CommonModule, formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, finalize } from 'rxjs';
import { KycService } from '../../data-access/kyc-service';

@Component({
  selector: 'app-update-data-kyc-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-data-kyc-modal-form.html',
  styleUrls: ['./update-data-kyc-modal-form.scss'],
  providers: [KycService],
})
export class UpdateDataKYCModalFormComponent implements OnDestroy {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) clientId!: string;
  @Input({ required: true }) activateModal!: NgbModalRef;
  @Output() passEntry: EventEmitter<void> = new EventEmitter<void>();
  firstName = '';
  lastName = '';
  date = new Date();
  gender = '';
  private kycServiceSubscription?: Subscription;
  private kycService = inject(KycService);

  saveChanges() {
    const data = {
      name: this.firstName,
      lastName: this.lastName,
      birthDate: formatDate(this.date, 'YYYYMMdd', 'en-US').toString(),
      gender: this.gender,
    };
    this.kycServiceSubscription = this.kycService
      .updateKycInformationUser(data, this.clientId)
      .pipe(finalize(() => this.activateModal.close()))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.kycServiceSubscription?.unsubscribe();
  }
}
