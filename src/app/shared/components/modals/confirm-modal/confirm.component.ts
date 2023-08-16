import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmModalData } from '@app/shared/services/modals/confirm-modal/interface/confirm-moda-data.interface';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  templateUrl: 'confirm.component.html',
})
export class ConfirmModalComponent {
  @Input({ required: true }) data!: ConfirmModalData;

  @Output() primaryButtonAction = new EventEmitter<void>();
  @Output() secondaryButtonAction = new EventEmitter<void>();

  onPrimaryButtonAction(): void {
    this.primaryButtonAction.emit();
  }

  onSecondaryButtonAction(): void {
    this.secondaryButtonAction.emit();
  }
}
