import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigateButtonComponent } from './buttons';
import { ErrorRetryComponent } from './errors';
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
    ErrorRetryComponent,
  ],
  exports: [
    NavigateButtonComponent,
    PaginationComponent,
    RangeDatepickerComponent,
    SelectComponent,
    SpinnerComponent,
    ErrorRetryComponent,
  ],
})
export class ComponentsModule {}
