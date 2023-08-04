import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { ToastsColors } from './enums';
import { CreateToastInfoDto, ToastInfo } from './interfaces';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toastsSig = signal<readonly ToastInfo[]>([]);
  readonly toasts = this.toastsSig.asReadonly();

  show({
    body,
    color = ToastsColors.SUCCESS,
    delay = 5000,
  }: CreateToastInfoDto) {
    const toast: ToastInfo = { body, color, delay };
    this.toastsSig.update((toasts) => [...toasts, toast]);

    return of(toast);
  }

  remove(toast: ToastInfo) {
    this.toastsSig.update((toasts) =>
      toasts.filter((_toast) => _toast !== toast),
    );
  }

  clear() {
    this.toastsSig.set([]);
  }
}
