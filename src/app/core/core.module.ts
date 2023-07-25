import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultBadgeComponent } from '@app/shared/components/badges/default/default-badge.component';
import { VisibleItemsPipe } from '@app/shared/pipes';
import { ServicesMonitorService } from '@app/shared/services';
import { NgbDropdownModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgHttpCachingModule } from 'ng-http-caching';
import { HeaderComponent } from './header/header.component';
import { InterceptorsModule } from './interceptors';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuItemComponent } from './sidebar/ui/menu-item/menu-item.component';
import { MonitorItemComponent } from './sidebar/ui/monitor-item/monitor-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainLayoutComponent,
    SidebarComponent,
    MenuItemComponent,
    MonitorItemComponent,
  ],
  providers: [ServicesMonitorService, VisibleItemsPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    NgHttpCachingModule,
    InterceptorsModule,
    RouterModule,
    NgbDropdownModule,
    DefaultBadgeComponent,
    NgbTooltip,
  ],
})
export class CoreModule {}
