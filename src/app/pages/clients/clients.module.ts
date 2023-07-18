import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import {
  ClientsComponentService,
  ClientsService,
  EcommercesService,
} from './data-access';
import { ClientDetailComponent } from './features/client-detail.ts/client-detail.component';
import {
  ClientsDataService,
  EcommercesDataService,
  PaymentMethodsDataService,
  TransactionsService,
} from './features/client-detail.ts/data-access';
import { TransactionsFiltersService } from './features/client-detail.ts/data-access/transactions-filter-service';
import {
  CardsInfoSectionComponent,
  EcommercesSectionComponent,
  PaymentsMethodsSectionComponent,
  TransactionSectionComponent,
  TransactionsFiltersComponent,
} from './features/client-detail.ts/features';
import { PaymentsMethodsTableComponent } from './features/client-detail.ts/ui/paymenths-methods-table';
import {
  CardInfoComponent,
  CardPhotoInfoComponent,
  ClientDeatilEcommercesTableComponent,
  ClientsFiltersComponent,
  ClientsTableComponent,
} from './ui';

@NgModule({
  declarations: [ClientsComponent, ClientDetailComponent],
  providers: [
    ClientsService,
    ClientsComponentService,
    EcommercesService,
    EcommercesDataService,
    ClientsDataService,
    PaymentMethodsDataService,
    TransactionsService,
    TransactionsFiltersService,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientsRoutingModule,
    ClientsTableComponent,
    ClientsFiltersComponent,
    CardInfoComponent,
    CardPhotoInfoComponent,
    ClientDeatilEcommercesTableComponent,
    PaymentsMethodsTableComponent,
    RouterModule,
    CardsInfoSectionComponent,
    EcommercesSectionComponent,
    PaymentsMethodsSectionComponent,
    TransactionSectionComponent,
    TransactionsFiltersComponent,
  ],
})
export class ClientsModule {}
