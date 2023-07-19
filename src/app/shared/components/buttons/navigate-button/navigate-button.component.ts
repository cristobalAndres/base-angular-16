import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button
    [title]="message ?? ''"
    [ngClass]="{ 'bi-arrow-left': !icon }"
    [className]="'btn btn-outline-primary rounded-5 bi navigate-button ' + icon"
    (click)="navigate()"
  >
    {{ message }}
  </button>`,
  styles: [
    `
      .navigate-button {
        padding: 0.5rem 1.25rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigateButtonComponent {
  private readonly router = inject(Router);

  @Input({ required: true }) to!: string;
  @Input() message?: string;
  @Input() icon = '';

  protected async navigate() {
    await this.router.navigate([this.to]);
  }
}