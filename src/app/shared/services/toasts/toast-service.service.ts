import { Injectable } from '@angular/core';
import { ToastsColors } from './enums';
import { ToastInfo } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: ToastInfo[] = [];

  show(body: string, color: ToastsColors = ToastsColors.PRIMARY, delay = 5000) {
    this.toasts.push({ body, color, delay });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
