import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionModalDataDto } from '@app/pages/clients/shared/dtos/transaction-modal-data.dto';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-transactions-detail-modal',
  templateUrl: './transactions-detail-modal.component.html',
  styleUrls: ['./transactions-detail-modal.component.scss'],
})
export class TransactionsDetailModalComponent {
  @Input({ required: true }) transactionData: TransactionModalDataDto[] = [];
  @Input({ required: true }) activateModal!: NgbModalRef;
  @Input({ required: false }) epayData?: TransactionModalDataDto[] = [];
}
