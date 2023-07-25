import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '@app/shared/enums';
import { VisibleItemsPipe } from '@app/shared/pipes';

interface Card {
  icon: string;
  title: string;
  description: string;
  route: string;
  permissions?: Roles[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private visibleItemsPipe = inject(VisibleItemsPipe);
  public visibleCards: Card[] = [];

  cards: Card[] = [
    {
      icon: 'file-person',
      title: 'Clientes',
      description: 'Busca, edita, bloquea y ve los detalles del cliente.',
      route: '/clients',
      permissions: [Roles.ADMIN],
    },
    {
      icon: 'cash-stack',
      title: 'Transacciones',
      description: 'Busca y ve los detalles de las transacciones.',
      route: '/transactions',
      permissions: [Roles.ADMIN],
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    void this.updateVisibleCards();
  }

  async updateVisibleCards(): Promise<void> {
    this.visibleCards = await this.visibleItemsPipe.transform(this.cards);
  }

  async redirectCard(route: string) {
    await this.router.navigate([route]);
  }
}
