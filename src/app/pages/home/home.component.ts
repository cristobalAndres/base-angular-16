import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cards = [{
    icon: 'file-person',
    title: 'Clientes',
    description: 'Busca, edita, bloquea y ve los detalles del cliente.',
    route: '/users'
  }, {
    icon: 'cash-stack',
    title: 'Transacciones',
    description: 'Busca y ve los detalles de las transacciones.',
    route: '/transactions'
  }]

  constructor(private router: Router) {
  }

  redirectCard(route: string) {
    this.router.navigate([route]);
  }

}
