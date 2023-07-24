import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultBadgeComponent } from '@app/shared/components/badges/default/default-badge.component';
import { ServicesMonitorService } from '@app/shared/services';
import { NgbDropdownModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import {
  NgHttpCachingConfig,
  NgHttpCachingModule,
  NgHttpCachingStrategy,
} from 'ng-http-caching';
import { HeaderComponent } from './header/header.component';
import { InterceptorsModule } from './interceptors';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuItemComponent } from './sidebar/ui/menu-item/menu-item.component';
import { MonitorItemComponent } from './sidebar/ui/monitor-item/monitor-item.component';

const ngHttpCachingConfig: NgHttpCachingConfig = {
  cacheStrategy: NgHttpCachingStrategy.DISALLOW_ALL,
  lifetime: 300000,
};

@NgModule({
  declarations: [
    HeaderComponent,
    MainLayoutComponent,
    SidebarComponent,
    MenuItemComponent,
    MonitorItemComponent,
  ],
  providers: [ServicesMonitorService],
  imports: [
    CommonModule,
    HttpClientModule,
    NgHttpCachingModule.forRoot(ngHttpCachingConfig),
    InterceptorsModule,
    RouterModule,
    NgbDropdownModule,
    DefaultBadgeComponent,
    NgbTooltip,
  ],
})
export class CoreModule {}
