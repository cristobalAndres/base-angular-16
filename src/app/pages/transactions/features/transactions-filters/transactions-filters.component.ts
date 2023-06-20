import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { TransactionsFiltersService } from '../../data-access';

@Component({
  selector: 'app-transactions-filters',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './transactions-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFiltersComponent {
  private readonly transactionsFiltersService = inject(
    TransactionsFiltersService,
  );

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
}
