import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TransactionsService } from './data-access';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  private static readonly ITEMS_PER_PAGE = 10;

  private readonly transactionsService = inject(TransactionsService);

  private readonly transactions$ = this.transactionsService.getTransactions({
    perPage: TransactionsComponent.ITEMS_PER_PAGE,
  });

  protected readonly transactions = toSignal(
    this.transactions$.pipe(map(({ transactions }) => transactions)),
  );

  protected readonly paginationData = toSignal(
    this.transactions$.pipe(
      map(({ total_items, total_pages, current_page }) => ({
        totalItems: total_items,
        totalPages: total_pages,
        currentPage: current_page,
        itemsPerPage: TransactionsComponent.ITEMS_PER_PAGE,
      })),
    ),
  );
}
