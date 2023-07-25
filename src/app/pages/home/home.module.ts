import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VisibleItemsPipe } from '@app/shared/pipes';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, VisibleItemsPipe],
})
export class HomeModule {}
