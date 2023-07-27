import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconButtonComponent } from '../../buttons';

@Component({
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  selector: 'app-error-retry',
  templateUrl: './error-retry.component.html',
  styleUrls: ['./error-retry.component.scss'],
})
export class ErrorRetryComponent {
  @Input() title = '¡Upsi, dupsi!';
  @Input() message =
    'No se ha podido obtener la información, por favor, inténtelo otra vez.';
  @Input() buttonText = 'volver a intentar';

  @Output() emitRetryButton = new EventEmitter<void>();

  onRetryButtonClick() {
    this.emitRetryButton.emit();
  }
}
