import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigateButtonComponent } from './buttons';

@NgModule({
  imports: [CommonModule, NavigateButtonComponent],
  exports: [NavigateButtonComponent],
})
export class ComponentsModule {}
