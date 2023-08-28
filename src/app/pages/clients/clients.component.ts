import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { ClientsComponentService } from './data-access';
import { CLientsFilters } from './shared';

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
  protected readonly hasError = this.clientsComponentService.hasError;

  protected clientsList = computed(() => this.loadClientsList());

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

  async onSearchButtonClick(clientsFilters: CLientsFilters) {
    this.clientsComponentService.cleanLocalData();
    this.clientsComponentService.changeFilter(clientsFilters.searchText);
    await this.clientsComponentService.loadClients();
  }

  private loadClientsList() {
    return this.clients().map((client) => {
      return {
        id: client.id ?? '',
        email: client.email ?? '',
        rut: client.rut ?? '',
        phone_number: client.phone_number ?? '',
        name: client.name ?? '',
        last_name: client.last_name ?? '',
        created_at: client.created_at ?? '',
      };
    });
  }

  protected async retryButtonClick() {
    await this.clientsComponentService.loadClients();
  }
}
