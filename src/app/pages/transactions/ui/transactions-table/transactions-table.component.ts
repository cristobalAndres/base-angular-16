import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionDto } from '../../shared';
import { TransactionStatusPipe } from '../../utils';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [CommonModule, TransactionStatusPipe],
  templateUrl: './transactions-table.component.html',
  styles: [
    `
      .currency::before {
        content: '$ ';
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsTableComponent {
  @Input({ required: true }) transactions!: ReadonlyArray<TransactionDto>;

  protected trackByTransactionId(
    _: number,
    { transaction_id }: TransactionDto,
  ) {
    return transaction_id;
  }
}
