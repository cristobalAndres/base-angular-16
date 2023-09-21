import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindAllCashInsDto } from '../../data-access';

@Component({
  selector: 'app-cash-ins-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cash-ins-table.component.html',
})
export class CashInsTableComponent {
  @Input({ required: true }) cashIns!: readonly FindAllCashInsDto[];
}
