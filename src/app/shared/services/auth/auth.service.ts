import { Injectable } from '@angular/core';
import { Role } from '@app/shared/enums';
import { Auth } from '@aws-amplify/auth';

interface UserAttributes {
  'custom:roles': string;
}
interface AuthUser {
  attributes: UserAttributes;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = {
    roles: Role,
  };

  private readonly ROLES_ATTRIBUTE = 'custom:roles';

  private getUser(): Promise<AuthUser> {
    return Auth.currentAuthenticatedUser() as Promise<AuthUser>;
  }

  async hasRole(roles: readonly Role[]) {
    const user = await this.getUser();
    const userRolesAttribute = user.attributes[this.ROLES_ATTRIBUTE];
    if (!userRolesAttribute) return true;
    const userRoles = new Set(userRolesAttribute.split(','));
    return roles.some((role) => userRoles.has(role));
  }
}
