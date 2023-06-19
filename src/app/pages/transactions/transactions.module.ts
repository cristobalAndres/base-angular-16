import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsService } from './transactions-service';
import { TransactionsComponent } from './transactions.component';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [CommonModule, SharedModule, TransactionsRoutingModule],
  providers: [TransactionsService],
})
export class TransactionsModule {}
