import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/login/login.component';
import { AuthGuard, RoleGuard } from './core/guards';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { Role } from './shared/enums';

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
        path: 'reports',
        canMatch: [AuthGuard.canMatch, RoleGuard.canMatch],
        loadChildren: () =>
          import('./pages/reports').then((m) => m.ReportsModule),
        data: { roles: [Role.ADMIN] },
      },
      {
        path: 'clients',
        canMatch: [AuthGuard.canMatch, RoleGuard.canMatch],
        loadChildren: () =>
          import('./pages/clients').then((m) => m.ClientsModule),
        data: { roles: [Role.ADMIN] },
      },
      {
        path: 'transactions',
        canMatch: [AuthGuard.canMatch, RoleGuard.canMatch],
        loadChildren: () =>
          import('./pages/transactions').then((m) => m.TransactionsModule),
        data: { roles: [Role.ADMIN] },
      },
      {
        path: 'cash-in',
        canMatch: [AuthGuard.canMatch, RoleGuard.canMatch],
        loadChildren: () =>
          import('./pages/cash-in').then((m) => m.CashInModule),
        data: { roles: [Role.ADMIN] },
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
