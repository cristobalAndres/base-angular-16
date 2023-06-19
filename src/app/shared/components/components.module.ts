import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigateButtonComponent } from './buttons';
import { PaginationComponent } from './tables';

@NgModule({
  imports: [CommonModule, NavigateButtonComponent, PaginationComponent],
  exports: [NavigateButtonComponent, PaginationComponent],
})
export class ComponentsModule {}
