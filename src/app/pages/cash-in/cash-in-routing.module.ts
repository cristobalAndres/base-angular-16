import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashInComponent } from './cash-in.component';

const routes: Routes = [{ path: '', component: CashInComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashInRoutingModule {}
