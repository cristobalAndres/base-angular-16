import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconButtonComponent, NavigateButtonComponent } from './buttons';
import { ErrorRetryComponent } from './errors';
import {
  InputFilterComponent,
  RangeDatepickerComponent,
  RangeDatepickerFilterComponent,
  SelectComponent,
} from './forms';
import { SpinnerComponent } from './loaders/spinner';
import { PaginationComponent } from './tables';

@NgModule({
  imports: [
    CommonModule,
    InputFilterComponent,
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
    InputFilterComponent,
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
