/* eslint-disable no-console */
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Roles } from '@app/shared/enums';
import { VisibleItemsPipe } from '@app/shared/pipes';
import { AuthService, ServicesMonitorService } from '@app/shared/services';
import { MonitorResponseDto } from '@app/shared/services/services-monitor/dtos';
import { interval, lastValueFrom } from 'rxjs';
import { MenuItemDto } from './dtos';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private servicesMonitor = inject(ServicesMonitorService);
  private authService = inject(AuthService);
  private visibleItemsPipe = inject(VisibleItemsPipe);
  private refreshInMinutes = 1000 * 60 * 5; // 5 min
  public visibleMenus: MenuItemDto[] = [];

  menus: MenuItemDto[] = [
    { name: 'Home', link: '/home', icon: 'house' },
    {
      name: 'Clientes',
      link: '/clients',
      icon: 'file-person',
      permissions: [Roles.ADMIN],
    },
    {
      name: 'Transacciones',
      link: '/transactions',
      icon: 'cash-stack',
      permissions: [Roles.ADMIN],
    },
  ];

  protected monitorResponse: MonitorResponseDto = { metrics: [] };
  protected isMonitorLoading = true;
  protected hasMonitorError = false;

  protected isMouseHover = false;

  setMouseHover(isHover: boolean) {
    this.isMouseHover = isHover;
  }

  private requestInterval$ = interval(this.refreshInMinutes).subscribe(() => {
    void this.loadMonitorData();
  });

  ngOnInit(): void {
    void this.loadMonitorData();
    void this.updateVisibleMenus();
  }

  async loadMonitorData() {
    try {
      const resMonitorService = await lastValueFrom(
        this.servicesMonitor.getStatusServices(),
      );
      this.monitorResponse = resMonitorService;

      this.isMonitorLoading = false;
    } catch {
      this.hasMonitorError = true;
    }
  }

  ngOnDestroy(): void {
    this.requestInterval$.unsubscribe();
  }

  async updateVisibleMenus(): Promise<void> {
    this.visibleMenus = await this.visibleItemsPipe.transform(this.menus);
  }
}
