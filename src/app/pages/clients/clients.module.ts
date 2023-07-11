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

@NgModule({
  declarations: [ClientsComponent, ClientDetailTsComponent],
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
    RouterModule,
  ],
})
export class ClientsModule {}
