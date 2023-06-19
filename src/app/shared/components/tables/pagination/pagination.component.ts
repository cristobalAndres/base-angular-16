import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  template: `
    <div class="d-grid gap-2 align-items-center">
      <div class="d-none d-md-grid gap-1 text-muted">
        <p>Página {{ page }} de {{ totalPages }}</p>
        <p>Mostrando {{ itemsPerPage }} de {{ totalItems }} {{ itemName }}</p>
      </div>
      <ngb-pagination
        [collectionSize]="totalItems"
        [pageSize]="itemsPerPage"
        [(page)]="page"
        [maxSize]="3"
        [rotate]="true"
        [boundaryLinks]="true"
      />
    </div>
  `,
  styles: [
    `
      p {
        margin: 0;
        padding: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input({ required: true }) itemName!: string;
  @Input({ required: true }) page!: number;
  @Input({ required: true }) totalPages!: number;
  @Input({ required: true }) itemsPerPage!: number;
  @Input({ required: true }) totalItems!: number;
}
