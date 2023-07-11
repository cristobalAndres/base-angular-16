import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconButtonComponent } from '@app/shared/components/buttons';
import { ClientListDto } from '../../shared/dtos';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, IconButtonComponent],
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent {
  @Input({ required: true }) clients!: ReadonlyArray<ClientListDto>;

  @Output() signoutButtonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.signoutButtonClick.emit();
  }
}
