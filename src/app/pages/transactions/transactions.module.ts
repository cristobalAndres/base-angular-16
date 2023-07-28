import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ErrorRetryComponent } from '@app/shared/components/errors';
import { TransactionsFiltersService, TransactionsService } from './data-access';
import { TransactionsFiltersComponent } from './features';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionsTableComponent } from './ui';

@NgModule({
  declarations: [TransactionsComponent],
  providers: [TransactionsService, TransactionsFiltersService],
  imports: [
    CommonModule,
    SharedModule,
    TransactionsRoutingModule,
    TransactionsFiltersComponent,
    TransactionsTableComponent,
    ErrorRetryComponent,
  ],
})
export class TransactionsModule {}
