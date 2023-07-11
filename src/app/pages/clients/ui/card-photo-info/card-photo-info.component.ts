import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconButtonComponent } from '@app/shared/components/buttons';

@Component({
  selector: 'app-card-photo-info',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  templateUrl: './card-photo-info.component.html',
  styleUrls: ['./card-photo-info.component.scss'],
})
export class CardPhotoInfoComponent {
  @Input({ required: true }) clientName = '';
  @Input() isLoading = false;

  @Output() signoutAccountButtonClickEvent: EventEmitter<void> =
    new EventEmitter<void>();

  getInitials() {
    return this.clientName?.at(0) ?? '';
  }

  onSignoutButtonClick() {
    this.signoutAccountButtonClickEvent.emit();
  }
}
