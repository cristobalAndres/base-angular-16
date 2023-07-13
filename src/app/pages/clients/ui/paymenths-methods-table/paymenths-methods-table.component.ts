import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DefaultBadgeComponent } from '@app/shared/components/badges/default/default-badge.component';
import { BadgeColors } from '../../../../shared/enums/badge-colors.enum';
import { PaymentsMethodsType } from '../../shared';
import { PaymentsMethodsListDto } from '../../shared/dtos/payments-methods-list.dto';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, DefaultBadgeComponent, FormsModule],
  selector: 'app-paymenths-methods-table',
  templateUrl: './paymenths-methods-table.component.html',
  styleUrls: ['./paymenths-methods-table.component.scss'],
})
export class PaymentsMethodsTableComponent {
  @Input({ required: true })
  paymentsMehtods!: ReadonlyArray<PaymentsMethodsListDto>;
  @Input({ required: true }) isAllCheckSelected!: boolean;

  @Output() allCheckBoxClickEvent = new EventEmitter<void>();
  @Output() checkBoxItemClickEvent = new EventEmitter<string>();

  protected successColor = BadgeColors.SUCCESS;
  protected dangerColor = BadgeColors.DANGER;
  protected cardType = PaymentsMethodsType.CARD;

  onAllCheckBoxClick() {
    this.allCheckBoxClickEvent.emit();
  }

  onCheckBoxItemClick(id: string) {
    this.checkBoxItemClickEvent.emit(id);
  }
}
