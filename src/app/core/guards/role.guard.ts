import { inject } from '@angular/core';
import { CanMatchFn, Data } from '@angular/router';
import { Role } from '@app/shared/enums';
import { AuthService } from '../../shared/services/auth/auth.service';

type RouteRoles = Readonly<{
  roles: readonly Role[];
}>;

const canMatchGuard: CanMatchFn = (route) => {
  const authService = inject(AuthService);

  if (!hasRoles(route.data))
    throw new Error(
      `Invalid route data for RoleGuard: ${String(route.data?.['roles'])}`,
    );

  return authService.hasRole(route.data.roles);
};

export const RoleGuard = {
  canMatch: canMatchGuard,
} as const;

function hasRoles(value?: Data): value is RouteRoles {
  if (!value) return false;
  if (!Array.isArray(value['roles'])) return false;

  return value['roles'].every((role) => role in Role);
}
