import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { IconButtonComponent } from '@app/shared/components/buttons';
import { ErrorRetryComponent } from '@app/shared/components/errors';
import { BannersRoutingModule } from './banners-routing.module';
import { BannersComponent } from './banners.component';
import { BannersService } from './data-access/banners-service';
import { CreateBannerModule } from './features/create-banner';
import { BannersFilterComponent } from './ui/banners-filter';
import { BannersTableComponent } from './ui/banners-table/banners-table.component';

@NgModule({
  declarations: [BannersComponent],
  imports: [
    CommonModule,
    SharedModule,
    BannersRoutingModule,
    BannersTableComponent,
    IconButtonComponent,
    BannersFilterComponent,
    ErrorRetryComponent,
    CreateBannerModule,
  ],
  providers: [BannersService],
})
export class BannersModule {}
