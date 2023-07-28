import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigateButtonComponent } from './buttons';
import { RangeDatepickerComponent, SelectComponent } from './forms';
import { SpinnerComponent } from './loaders/spinner';
import { PaginationComponent } from './tables';

@NgModule({
  imports: [
    CommonModule,
    NavigateButtonComponent,
    PaginationComponent,
    RangeDatepickerComponent,
    SelectComponent,
    SpinnerComponent,
  ],
  exports: [
    NavigateButtonComponent,
    PaginationComponent,
    RangeDatepickerComponent,
    SelectComponent,
    SpinnerComponent,
  ],
})
export class ComponentsModule {}
