import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgHttpCachingConfig,
  NgHttpCachingModule,
  NgHttpCachingStrategy,
} from 'ng-http-caching';
import { HeaderComponent } from './header/header.component';
import { InterceptorsModule } from './interceptors';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const ngHttpCachingConfig: NgHttpCachingConfig = {
  cacheStrategy: NgHttpCachingStrategy.DISALLOW_ALL,
  lifetime: 300000,
};

@NgModule({
  declarations: [HeaderComponent, MainLayoutComponent, SidebarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgHttpCachingModule.forRoot(ngHttpCachingConfig),
    InterceptorsModule,
    RouterModule,
    NgbDropdownModule,
  ],
})
export class CoreModule {}
