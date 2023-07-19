import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      *ngIf="!isLoading && icon"
      [className]="'btn btn-outline-primary rounded-5 bi icon-button '"
      (click)="onClick()"
    >
      <i *ngIf="icon" [ngClass]="['bi', icon]"></i>
    </button>
    <p class="placeholder-glow">
      <span
        *ngIf="isLoading"
        href="#"
        tabindex="-1"
        class="btn btn-primary rounded-5 bi icon-button disabled placeholder icon-button"
      ></span>
    </p>`,
  styles: [
    `
      .icon-button {
        width: 45px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  @Input() message?: string;
  @Input({ required: true }) icon!: string;
  @Input() isLoading = false;
  @Input() id = ''; //Optional

  @Output() clickEmiter: EventEmitter<string> = new EventEmitter<string>();

  protected onClick() {
    this.clickEmiter.emit(this.id);
  }
}
