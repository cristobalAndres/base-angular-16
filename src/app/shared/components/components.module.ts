import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigateButtonComponent } from './buttons';
import {
  ButtonDatepickerComponent,
  InputDatepickerComponent,
  InputNumberFilterComponent,
  InputTextFilterComponent,
  RangeDatepickerComponent,
  RangeDatepickerFilterComponent,
  SelectComponent,
} from './forms';
import { SpinnerComponent } from './loaders/spinner';
import { PaginationComponent } from './tables';

@NgModule({
  imports: [
    CommonModule,
    InputNumberFilterComponent,
    InputTextFilterComponent,
    NavigateButtonComponent,
    PaginationComponent,
    ButtonDatepickerComponent,
    InputDatepickerComponent,
    RangeDatepickerComponent,
    RangeDatepickerFilterComponent,
    SelectComponent,
    SpinnerComponent,
  ],
  exports: [
    InputNumberFilterComponent,
    InputTextFilterComponent,
    NavigateButtonComponent,
    PaginationComponent,
    ButtonDatepickerComponent,
    InputDatepickerComponent,
    RangeDatepickerComponent,
    RangeDatepickerFilterComponent,
    SelectComponent,
    SpinnerComponent,
  ],
})
export class ComponentsModule {}
