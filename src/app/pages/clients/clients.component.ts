import { Component, OnInit, inject } from '@angular/core';
import { SelectionDto } from '@app/shared/components/forms';
import { ClientsComponentService } from './data-access';
import { CLientsFilters, ClientParameter } from './shared';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  private readonly clientsComponentService = inject(ClientsComponentService);

  protected readonly clients =
    this.clientsComponentService.clients.asReadonly();

  protected readonly isLoading =
    this.clientsComponentService.isLoading.asReadonly();

  protected readonly pagination =
    this.clientsComponentService.pagination.asReadonly();

  async ngOnInit() {
    this.clientsComponentService.currentPage.set(1);
    await this.clientsComponentService.loadClients();
  }

  protected async onCurrentPageChange(currentPage: number) {
    this.clientsComponentService.currentPage.set(currentPage);
    await this.clientsComponentService.loadClients();
  }

  protected readonly statusOptions: SelectionDto<ClientParameter>[] =
    Object.values(ClientParameter).map((clientParameter) => ({
      value: clientParameter,
      label: clientParameter,
    }));

  async onSearchButtonClick(clientsFilters: CLientsFilters) {
    this.clientsComponentService.search.set(clientsFilters.searchText);
    this.clientsComponentService.searchBy.set(clientsFilters.searchBy);
    await this.clientsComponentService.loadClients();
  }
}
