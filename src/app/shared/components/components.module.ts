import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigateButtonComponent } from './buttons';
import { PaginationComponent } from './tables';
import { RangeDatepickerComponent } from './forms';

@NgModule({
  imports: [
    CommonModule,
    NavigateButtonComponent,
    PaginationComponent,
    RangeDatepickerComponent,
  ],
  exports: [
    NavigateButtonComponent,
    PaginationComponent,
    RangeDatepickerComponent,
  ],
})
export class ComponentsModule {}
