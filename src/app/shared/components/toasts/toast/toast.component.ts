import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService } from '@app/shared/services/toasts/toast-service.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [CommonModule, NgbToastModule],
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);

  protected toasts = this.toastService.toasts;
}
