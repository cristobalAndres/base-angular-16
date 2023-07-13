import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { ClientsComponent } from './clients.component';
import {
  ClientDetailServiceComponentService,
  ClientsComponentService,
  ClientsService,
  EcommercesService,
} from './data-access';
import { ClientDetailTsComponent } from './features/client-detail.ts/client-detail.ts.component';
import {
  CardInfoComponent,
  CardPhotoInfoComponent,
  ClientDeatilEcommercesTableComponent,
  ClientsFiltersComponent,
  ClientsTableComponent,
} from './ui';
import { PaymentsMethodsTableComponent } from './ui/paymenths-methods-table';
import { TransactionComponent } from './features/client-detail.ts/features/transaction/transaction.component';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientDetailTsComponent,
    TransactionComponent,
  ],
  providers: [
    ClientsService,
    ClientsComponentService,
    ClientDetailServiceComponentService,
    EcommercesService,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientsTableComponent,
    ClientsFiltersComponent,
    CardInfoComponent,
    CardPhotoInfoComponent,
    ClientDeatilEcommercesTableComponent,
    PaymentsMethodsTableComponent,
    RouterModule,
  ],
})
export class ClientsModule {}
