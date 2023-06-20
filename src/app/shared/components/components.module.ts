import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigateButtonComponent } from './buttons';
import { RangeDatepickerComponent, SelectComponent } from './forms';
import { PaginationComponent } from './tables';

@NgModule({
  imports: [
    CommonModule,
    NavigateButtonComponent,
    PaginationComponent,
    RangeDatepickerComponent,
    SelectComponent,
  ],
  exports: [
    NavigateButtonComponent,
    PaginationComponent,
    RangeDatepickerComponent,
    SelectComponent,
  ],
})
export class ComponentsModule {}
