import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menus = [
    { name: 'Home', link: '/home', icon: 'house' },
    { name: 'Clientes', link: '/users', icon: 'file-person' },
    { name: 'Transacciones', link: '/transactions', icon: 'cash-stack' },
  ];
}
