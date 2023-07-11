import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeColors } from '@app/shared/enums';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-default-badge',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  template: ` <span [ngClass]="['badge', color]">{{ text }}</span> `,
})
export class DefaultBadgeComponent {
  @Input() color: BadgeColors = BadgeColors.SUCCESS;
  @Input({ required: true }) text!: string;
}
