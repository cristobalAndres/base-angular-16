import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Auth } from 'aws-amplify';

const canMatchGuard: CanMatchFn = () => {
  const router = inject(Router);
  return checkAuthenticatedUser(router);
};

const canActivateGuard: CanActivateFn = () => {
  const router = inject(Router);
  return checkAuthenticatedUser(router);
};

export const AuthGuard = {
  canMatch: canMatchGuard,
  canActivate: canActivateGuard,
} as const;

async function checkAuthenticatedUser(router: Router) {
  try {
    await Auth.currentAuthenticatedUser();
  } catch (e) {
    return router.parseUrl('/login');
  }

  return true;
}
