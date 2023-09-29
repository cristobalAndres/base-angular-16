import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconButtonComponent, NavigateButtonComponent } from './buttons';
import { ErrorRetryComponent } from './errors';
import {
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
    IconButtonComponent,
    PaginationComponent,
    RangeDatepickerComponent,
    RangeDatepickerFilterComponent,
    SelectComponent,
    SpinnerComponent,
    ErrorRetryComponent,
  ],
  exports: [
    InputNumberFilterComponent,
    InputTextFilterComponent,
    NavigateButtonComponent,
    IconButtonComponent,
    PaginationComponent,
    RangeDatepickerComponent,
    RangeDatepickerFilterComponent,
    SelectComponent,
    SpinnerComponent,
    ErrorRetryComponent,
  ],
})
export class ComponentsModule {}
