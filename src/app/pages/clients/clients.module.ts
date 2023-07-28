import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { ErrorRetryComponent } from '@app/shared/components/errors';
import { RutPipe } from '@app/shared/pipes';
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
import { TransactionsDetailModalComponent } from './features/client-detail.ts/ui/transactions-detail-modal/transactions-detail-modal.component';
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
    DatePipe,
    RutPipe,
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
    TransactionsDetailModalComponent,
    ErrorRetryComponent,
  ],
})
export class ClientsModule {}
