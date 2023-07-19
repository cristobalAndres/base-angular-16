import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TransactionStatusPipe } from '@app/shared/pipes';
import { TransactionDto } from '@app/shared/services/transactions';

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
