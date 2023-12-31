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
    [ngClass]="[icon || 'bi-arrow-left']"
    class="btn rounded-5 bi navigate-button"
    (click)="navigate()"
  >
    {{ message }}
  </button>`,
  styles: [
    `
      .navigate-button {
        padding: 0.5rem 1.25rem;
        color: var(--primary-color);
        border: solid 2px;
      }
      .navigate-button:hover {
        background-color: var(--primary-color);
        color: white;
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
