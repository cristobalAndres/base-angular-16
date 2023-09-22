import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FindAllCashInsDto } from '../../data-access';
import { ChannelPipe, PaymentInfoStatusPipe } from '../../shared/pipes';

@Component({
  selector: 'app-cash-ins-table',
  standalone: true,
  imports: [CommonModule, PaymentInfoStatusPipe, ChannelPipe],
  templateUrl: './cash-ins-table.component.html',
  styleUrls: ['./cash-ins-table.component.scss'],
})
export class CashInsTableComponent {
  @Input({ required: true }) cashIns!: readonly FindAllCashInsDto[];
}
