import { Injectable } from '@angular/core';
import { CanMatch, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth/auth.service';

interface RouteData {
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanMatch {
  constructor(private authService: AuthService) {}

  canMatch(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = (route.data as RouteData).roles;
    return this.authService.hasRole(expectedRole);
  }
}
