import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconButtonComponent } from '@app/shared/components/buttons';
import { TransactionStatusPipe, TransactionTypePipe } from '@app/shared/pipes';
import { TransactionDto } from '@app/shared/services/transactions';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TransactionStatusPipe,
    TransactionTypePipe,
    IconButtonComponent,
  ],
  selector: 'app-client-transactions-table',
  templateUrl: './client-transactions-table.component.html',
  styles: [
    `
      .currency::before {
        content: '$ ';
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTransactionsTableComponent {
  @Input({ required: true }) transactions!: ReadonlyArray<TransactionDto>;

  protected trackByTransactionId(
    _: number,
    { transaction_id }: TransactionDto,
  ) {
    return transaction_id;
  }

  /* eslint-disable-next-line  */
  protected onClickViewInfo(id: string) {
    //TODO: implement
  }
}
