/* eslint-disable no-console */
import { Injectable } from '@angular/core';
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
    roles: 'ADMIN,EXECUTIVE',
  };

  private readonly ROLES_ATTRIBUTE = 'custom:roles';

  private async getUser(): Promise<AuthUser> {
    return Auth.currentAuthenticatedUser() as Promise<AuthUser>;
  }

  async hasRole(role: string[]) {
    const user = await this.getUser();
    if (!user.attributes[this.ROLES_ATTRIBUTE]) {
      return true;
    }
    return role.some((r: string) =>
      user.attributes[this.ROLES_ATTRIBUTE].split(',').includes(r),
    );
  }
}
