import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountDetailModalDataDto } from '@app/pages/clients/shared';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-account-detail-modal',
  templateUrl: './account-detail-modal.html',
  styleUrls: ['./account-detail-modal.scss'],
})
export class AccountDetailModalComponent {
  @Input({ required: true }) activateModal!: NgbModalRef;
  @Input({ required: true }) accountData: AccountDetailModalDataDto[] = [];
}
