import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(public authenticator: AuthenticatorService, private router: Router) {
  }

  logOut() {
    this.authenticator.signOut()
    this.router.navigate(['/login']);
  }
}
