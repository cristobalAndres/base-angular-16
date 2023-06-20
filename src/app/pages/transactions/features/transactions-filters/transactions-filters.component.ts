import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFiltersComponent {}
