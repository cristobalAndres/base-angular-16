import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { InterceptorsModule } from './interceptors';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, MainLayoutComponent, SidebarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    InterceptorsModule,
    RouterModule,
    NgbDropdownModule,
  ],
})
export class CoreModule {}
