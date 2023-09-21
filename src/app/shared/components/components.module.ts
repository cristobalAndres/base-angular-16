import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconButtonComponent, NavigateButtonComponent } from './buttons';
import { ErrorRetryComponent } from './errors';
import { RangeDatepickerComponent, SelectComponent } from './forms';
import { SpinnerComponent } from './loaders/spinner';
import { PaginationComponent } from './tables';

@NgModule({
  imports: [
    CommonModule,
    NavigateButtonComponent,
    IconButtonComponent,
    PaginationComponent,
    RangeDatepickerComponent,
    SelectComponent,
    SpinnerComponent,
    ErrorRetryComponent,
  ],
  exports: [
    NavigateButtonComponent,
    IconButtonComponent,
    PaginationComponent,
    RangeDatepickerComponent,
    SelectComponent,
    SpinnerComponent,
    ErrorRetryComponent,
  ],
})
export class ComponentsModule {}
