import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@app/shared/enums';

interface Card {
  icon: string;
  title: string;
  description: string;
  route: string;
  permissions?: Role[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  cards: Card[] = [
    {
      icon: 'file-person',
      title: 'Clientes',
      description: 'Busca, edita, bloquea y ve los detalles del cliente.',
      route: '/clients',
      // permissions: [Role.ADMIN],
    },
  ];

  constructor(private router: Router) {}

  async redirectCard(route: string) {
    await this.router.navigate([route]);
  }
}
