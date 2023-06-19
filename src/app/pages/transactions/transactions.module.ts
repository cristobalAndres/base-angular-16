import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { TransactionsFiltersComponent } from './transactions-filters';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsService } from './transactions-service';
import { TransactionsTableComponent } from './transactions-table';
import { TransactionsComponent } from './transactions.component';

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
