import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { ClientsComponent } from './clients.component';
import { ClientsComponentService, ClientsService } from './data-access';
import { ClientsFiltersComponent, ClientsTableComponent } from './ui';

@NgModule({
  declarations: [ClientsComponent],
  providers: [ClientsService, ClientsComponentService],
  imports: [
    CommonModule,
    SharedModule,
    ClientsTableComponent,
    ClientsFiltersComponent,
    RouterModule,
  ],
})
export class CLientsModule {}
