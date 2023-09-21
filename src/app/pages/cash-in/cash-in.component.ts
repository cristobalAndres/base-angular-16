import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SharedModule } from '@app/shared';
import { FindAllCashInsService } from './data-access';
import { CashInsFiltersComponent, CashInsTableComponent } from './ui';

@Component({
  selector: 'app-cash-in',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    CashInsTableComponent,
    CashInsFiltersComponent,
  ],
  templateUrl: './cash-in.component.html',
})
export class CashInComponent {
  private readonly findAllCashInsService = inject(FindAllCashInsService);

  protected readonly cashInsSig = toSignal(this.findAllCashInsService.cashIns$);
  protected readonly paginationSig = toSignal(
    this.findAllCashInsService.pagination$,
  );
  protected readonly hasErrorSig = toSignal(
    this.findAllCashInsService.hasError$,
  );
  protected readonly isLoadingSig = toSignal(
    this.findAllCashInsService.isLoading$,
  );

  protected changePage(pageNumber: number) {
    this.findAllCashInsService.changePage(pageNumber);
  }

  protected searchCashIns(search?: string) {
    this.findAllCashInsService.searchCashIns(search);
  }

  protected retry() {
    this.findAllCashInsService.retry();
  }
}
