import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard.canActivate],
      },
      {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [AuthGuard.canActivate],
      },
      {
        path: 'transactions',
        canMatch: [AuthGuard.canLoad],
        loadChildren: () =>
          import('./pages/transactions').then((m) => m.TransactionsModule),
      },
    ],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
