import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SelectionDto } from '@app/shared/components/forms';
import { TransactionStatusPipe, TransactionTypePipe } from '@app/shared/pipes';
import { ToastService } from '@app/shared/services';
import { ToastsColors } from '@app/shared/services/toasts';
import {
  TransactionStatus,
  TransactionType,
} from '@app/shared/services/transactions';
import { Auth } from 'aws-amplify';
import { catchError, finalize, retry, take, tap, throwError } from 'rxjs';
import { ReportService } from './data-access/report-service';
import { AuthCurrentUserDto } from './shared/dtos';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionReportComponent {
  private reportService = inject(ReportService);
  private toastService = inject(ToastService);

  public startDate: Date | undefined;
  public endDate: Date | undefined;
  public status: TransactionStatus | undefined;
  public type: TransactionType | undefined;

  protected isLoading = signal(false);

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

  public async generateReport() {
    this.isLoading.set(true);
    this.toastService.clear();
    this.toastService.show({
      body: 'Generando reporte...',
      color: ToastsColors.PRIMARY,
    });

    this.endDate?.setDate(this.endDate?.getDate() + 1);

    const email = await this.getEmail();
    const data = {
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.status ?? TransactionStatus.ALL,
      type: this.type ?? TransactionType.ALL,
      email,
    };

    this.reportService
      .generateReport(data)
      .pipe(
        take(1),
        retry(2),
        finalize(() => this.isLoading.set(false)),
        catchError((error: unknown) => {
          this.toastService.clear();
          this.toastService.show({
            body: 'No se ha podido generar el reporte.',
            color: ToastsColors.DANGER,
          });
          return throwError(() => error);
        }),
        tap(() => {
          this.toastService.clear();
          this.toastService.show({
            body: 'El reporte se ha generado correctamente, se le enviará un correo para descargar el reporte.',
            color: ToastsColors.SUCCESS,
          });
        }),
      )
      .subscribe();
  }

  async getEmail(): Promise<string> {
    const user = (await Auth.currentUserInfo()) as AuthCurrentUserDto;
    return user?.attributes?.email ?? '';
  }
}
