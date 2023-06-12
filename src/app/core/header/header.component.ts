import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Router } from "@angular/router";
// import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // imports: [NgbDropdownModule],
})
export class HeaderComponent {
  user: any;

  constructor(
    public authenticator: AuthenticatorService,
    private router: Router) {
      // config.autoClose = 'outside';
    }

  async ngOnInit() {
    try {
      this.user = await Auth.currentAuthenticatedUser();
    } catch (error) {
      console.log('error fetching user', error);
    }
  }

  logout() {
    this.authenticator.signOut()
    this.router.navigate(['/login']);
  }
}
