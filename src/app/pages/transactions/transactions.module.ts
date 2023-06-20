import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { TransactionsService } from './data-access';
import { TransactionsFiltersComponent } from './features';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionsTableComponent } from './ui';

@NgModule({
  declarations: [TransactionsComponent],
  providers: [TransactionsService],
  imports: [
    CommonModule,
    SharedModule,
    TransactionsRoutingModule,
    TransactionsFiltersComponent,
    TransactionsTableComponent,
  ],
})
export class TransactionsModule {}
