import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { TransactionReportComponent } from './features/transaction-report/transaction-report.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';

@NgModule({
  declarations: [ReportsComponent, TransactionReportComponent],
  imports: [CommonModule, SharedModule, ReportsRoutingModule],
})
export class ReportsModule {}
