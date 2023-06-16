import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [CommonModule, SharedModule, TransactionsRoutingModule],
})
export class TransactionsModule {}
