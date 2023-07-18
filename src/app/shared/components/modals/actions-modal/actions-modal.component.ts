import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-actions-modal',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">{{ title }}</h4>
      <!-- TODO: estás son las acciones a recibir -->
      <!-- <button
        type="button"
        class="btn btn-close"
        (click)="modal.dismiss()"
        aria-label="Close"
      ></button> -->
    </div>
    <div class="modal-body">
      <div class="mb-3" *ngIf="body.bodyText">
        <p>{{ body.bodyText }}</p>
      </div>
    </div>
    <div class="modal-footer">
      <!-- <button
        (click)="modal.close(obj)"
        type="button"
        class="btn btn-outline-dark"
        *ngIf="actions.cancel"
      >
        {{ actions.cancel }}
      </button> -->
      <!-- <button
        (click)="modal.close(obj)"
        type="button"
        class="btn btn-primary"
        *ngIf="actions.success"
      >
        {{ actions.success }}
      </button> -->
    </div>`,
  styles: [
    `
      .input-div {
        margin-bottom: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsModalComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) body!: {
    bodyText: string;
  };
  @Input({ required: true }) actions!: {
    success: string;
    cancel: string;
  };
  // @Input({ required: true }) modal!: any;
  private modalService = inject(NgbModal);
  @Output() clickEmiter: EventEmitter<void> = new EventEmitter<void>();

  //TODO: esto se devolverá al cerrar el modal, se deja referencia para futuro desarrollo.
  protected obj = {
    name: 'asd',
    'last-name': ' asd',
  };
}
