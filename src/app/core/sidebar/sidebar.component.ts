import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { EventType, NavigationEnd, Router } from '@angular/router';
import { Role } from '@app/shared/enums';
import { ServicesMonitorService } from '@app/shared/services';
import { MonitorResponseDto } from '@app/shared/services/services-monitor/dtos';
import { Subscription, filter, interval, lastValueFrom } from 'rxjs';
import { MenuItemDto } from './dtos';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private servicesMonitor = inject(ServicesMonitorService);
  private refreshInMinutes = 1000 * 60 * 5; // 5 min

  private requestInterval = interval(this.refreshInMinutes).subscribe(() => {
    void this.loadMonitorData();
  });

  private router = inject(Router);
  private routerSub!: Subscription;

  menus: MenuItemDto[] = [
    { name: 'Home', link: '/home', icon: 'house', isActiveRoute: false },
    {
      name: 'Clientes',
      link: '/clients',
      icon: 'file-person',
      permissions: [Role.ADMIN],
      isActiveRoute: false,
    },
    {
      name: 'Transacciones',
      link: '/transactions',
      icon: 'cash-stack',
      permissions: [Role.ADMIN],
      isActiveRoute: false,
    },
    {
      name: 'Reportes',
      link: '/reports',
      icon: 'archive',
      permissions: [Role.ADMIN],
      isActiveRoute: false,
    },
    {
      name: 'Banners',
      link: '/banners',
      icon: 'image',
      permissions: [Role.ADMIN],
      isActiveRoute: false,
    },
  ];

  constructor() {
    this.routerSub = this.router.events
      .pipe(filter((event) => event.type === EventType.NavigationEnd))
      .subscribe((value) => {
        const url = (value as NavigationEnd).urlAfterRedirects;
        this.menus = this.menus.map((menuItem) => ({
          ...menuItem,
          isActiveRoute: url.includes(menuItem.link),
        }));
      });
  }

  protected monitorResponse: MonitorResponseDto = { metrics: [] };
  protected isMonitorLoading = true;
  protected hasMonitorError = false;

  protected isMouseHover = false;

  setMouseHover(isHover: boolean) {
    this.isMouseHover = isHover;
  }

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
    this.requestInterval.unsubscribe();
    this.routerSub.unsubscribe();
  }
}
