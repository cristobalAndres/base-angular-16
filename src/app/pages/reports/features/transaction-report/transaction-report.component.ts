import { Component, inject } from '@angular/core';
import { SelectionDto } from '@app/shared/components/forms';
import { TransactionStatusPipe, TransactionTypePipe } from '@app/shared/pipes';
import {
  TransactionStatus,
  TransactionType,
} from '@app/shared/services/transactions';
import { ReportService } from './data-access/report-service';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss'],
})
export class TransactionReportComponent {
  private reportService = inject(ReportService);

  public startDate: Date | undefined;
  public endDate: Date | undefined;
  public status: TransactionStatus | undefined;
  public type: TransactionType | undefined;

  protected readonly statusOptions: SelectionDto<TransactionStatus>[] =
    Object.values(TransactionStatus).map((transactionStatus) => ({
      value: transactionStatus,
      label: TransactionStatusPipe.TRANSACTION_STATUSES[transactionStatus],
    }));

  protected readonly typeOptions: SelectionDto<TransactionType>[] =
    Object.values(TransactionType).map((transactionType) => ({
      value: transactionType,
      label: TransactionTypePipe.TRANSACTION_TYPES[transactionType],
    }));

  protected onStartDateChange(date: Date | undefined) {
    this.startDate = date;
  }

  protected onEndDateChange(date: Date | undefined) {
    this.endDate = date;
  }

  protected onStatusChange(status: TransactionStatus | undefined) {
    this.status = status;
  }
  protected onTypeChange(type: TransactionType | undefined) {
    this.type = type;
  }

  public generateReport() {
    const data = {
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.status,
      type: this.type,
    };

    this.reportService.generateReport(data);
  }
}
