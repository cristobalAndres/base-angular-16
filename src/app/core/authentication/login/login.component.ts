import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

interface AuthData {
  authStatus: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    public authenticator: AuthenticatorService,
    private router: Router,
  ) {
    this.authenticator = authenticator;
    authenticator.subscribe((data: AuthData) => {
      if (data.authStatus === 'authenticated') {
        void this.router.navigate(['/home']);
      }
    });
  }
}
