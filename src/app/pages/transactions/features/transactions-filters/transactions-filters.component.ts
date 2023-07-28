import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { SharedModule } from '@app/shared';
import { IconButtonComponent } from '@app/shared/components/buttons';
import {
  RangeDatepickerComponent,
  SelectComponent,
  SelectionDto,
} from '@app/shared/components/forms';
import { TransactionStatusPipe } from '@app/shared/pipes';
import { TransactionStatus } from '@app/shared/services/transactions';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsFiltersService } from '../../data-access';

@Component({
  selector: 'app-transactions-filters',
  standalone: true,
  imports: [CommonModule, SharedModule, IconButtonComponent, NgbTooltip],
  templateUrl: './transactions-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFiltersComponent {
  private readonly transactionsFiltersService = inject(
    TransactionsFiltersService,
  );

  @ViewChild(RangeDatepickerComponent)
  rangeDatePickerComponent!: RangeDatepickerComponent;

  @ViewChildren(SelectComponent)
  selectComponents!: QueryList<SelectComponent>;

  protected readonly statusOptions: SelectionDto<TransactionStatus>[] =
    Object.values(TransactionStatus).map((transactionStatus) => ({
      value: transactionStatus,
      label: TransactionStatusPipe.TRANSACTION_STATUSES[transactionStatus],
    }));

  protected onStartDateChange(date: Date | undefined) {
    this.transactionsFiltersService.updateTransactionsFilters({
      startDate: date,
    });
  }

  protected onEndDateChange(date: Date | undefined) {
    this.transactionsFiltersService.updateTransactionsFilters({
      endDate: date,
    });
  }

  protected onStatusChange(status: TransactionStatus | undefined) {
    this.transactionsFiltersService.updateTransactionsFilters({
      statusFilter: status,
    });
  }

  protected filtersReset() {
    this.rangeDatePickerComponent.reset();
    this.selectComponents.toArray().forEach((selectComponent) => {
      selectComponent.reset();
    });
  }
}
