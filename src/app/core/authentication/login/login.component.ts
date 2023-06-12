import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public authenticator: AuthenticatorService, private router: Router) {
    this.authenticator = authenticator;
    authenticator.subscribe((data: any) => {
      if (data.authStatus === "authenticated") {
        this.router.navigate(['/home']);
      };
    })
  }

  ngOnInit() {}
}
