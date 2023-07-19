import { Component, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { SelectionDto } from '@app/shared/components/forms';
import { formatRut, getDate, getTime } from '@app/shared/helpers';
import { ClientsComponentService } from './data-access';
import { CLientsFilters, ClientListDto, ClientParameter } from './shared';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, OnDestroy {
  private readonly clientsComponentService = inject(ClientsComponentService);

  protected readonly clients = this.clientsComponentService.clients;

  protected readonly isLoading = this.clientsComponentService.isLoading;

  protected readonly pagination = this.clientsComponentService.pagination;

  protected clientsList: ClientListDto[] = [];

  constructor() {
    effect(() => {
      this.loadClientsList();
    });
  }

  async ngOnInit() {
    this.clientsComponentService.changeCurrentPage(1);
    await this.clientsComponentService.loadClients();
  }

  ngOnDestroy() {
    this.clientsComponentService.cleanLocalData();
  }

  protected async onCurrentPageChange(currentPage: number) {
    this.clientsComponentService.changeCurrentPage(currentPage);
    await this.clientsComponentService.loadClients();
  }

  protected readonly statusOptions: SelectionDto<ClientParameter>[] =
    Object.values(ClientParameter).map((clientParameter) => ({
      value: clientParameter,
      label: clientParameter,
    }));

  async onSearchButtonClick(clientsFilters: CLientsFilters) {
    this.clientsComponentService.cleanLocalData();
    this.clientsComponentService.changeFilter(
      clientsFilters.searchText,
      clientsFilters.searchBy ?? ClientParameter.EMAIL,
    );
    await this.clientsComponentService.loadClients();
  }

  private loadClientsList() {
    this.clientsList = this.clients().map((client) => {
      return {
        id: client.id ?? '',
        email: client.email ?? '',
        rut: formatRut(client.rut) ?? '',
        phone_number: client.phone_number ?? '',
        name: client.name ?? '',
        last_name: client.last_name ?? '',
        created_at: client.created_at
          ? `${getDate(client.created_at)} ${getTime(client.created_at)}`
          : '',
      };
    });
  }
}
