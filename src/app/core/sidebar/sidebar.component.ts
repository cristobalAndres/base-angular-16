import { Component, OnDestroy, inject } from '@angular/core';
import { EventType, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { MenuItemDto } from './dtos';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy {
  private router = inject(Router);
  private routerSub!: Subscription;

  menus: MenuItemDto[] = [
    { name: 'Home', link: '/home', icon: 'house', isActiveRoute: false },
    {
      name: 'Clientes',
      link: '/clients',
      icon: 'file-person',
      // permissions: [Role.ADMIN],
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

  protected isMouseHover = false;

  setMouseHover(isHover: boolean) {
    this.isMouseHover = isHover;
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
