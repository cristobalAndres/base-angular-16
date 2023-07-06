import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientDto } from '../../shared/dtos';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent {
  @Input({ required: true }) clients!: ReadonlyArray<ClientDto>;
}
