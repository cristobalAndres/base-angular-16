import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionReportComponent } from './features/transaction-report/transaction-report.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  {
    path: '',
    component: ReportsComponent,
    children: [{ path: 'transaction', component: TransactionReportComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
