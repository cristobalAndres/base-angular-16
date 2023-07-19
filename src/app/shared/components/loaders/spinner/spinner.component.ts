import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpinnerColor } from '@app/shared/enums';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  template: `
    <div class="d-flex justify-content-center">
      <div [ngClass]="['spinner-border', color]" role="status"></div>
    </div>
  `,
})
export class SpinnerComponent {
  @Input() color: SpinnerColor = SpinnerColor.PRIMARY;
}
