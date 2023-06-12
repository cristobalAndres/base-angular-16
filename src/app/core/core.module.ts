import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [HeaderComponent, MainLayoutComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule
  ],
})
export class CoreModule { }