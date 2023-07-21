import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ServicesMonitorService } from '@app/shared/services';
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

  menus: MenuItemDto[] = [
    { name: 'Home', link: '/home', icon: 'house' },
    { name: 'Clientes', link: '/clients', icon: 'file-person' },
    { name: 'Transacciones', link: '/transactions', icon: 'cash-stack' },
  ];

  protected monitorResponse: MonitorResponseDto = { metrics: [] };
  protected isMonitorLoading = true;
  protected hasMonitorError = false;

  protected isMouseHover = false;

  setMouseHover(isHover: boolean) {
    this.isMouseHover = isHover;
  }

  private requestInterval$ = interval(10000).subscribe(() => {
    void this.loadMonitorData();
  });

  ngOnInit(): void {
    void this.loadMonitorData();
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
}
