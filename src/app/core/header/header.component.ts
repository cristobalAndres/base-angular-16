import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Auth } from 'aws-amplify';
// import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // imports: [NgbDropdownModule],
})
export class HeaderComponent {
  user: unknown;

  constructor(
    public authenticator: AuthenticatorService,
    private router: Router,
  ) {
    // config.autoClose = 'outside';
  }

  async ngOnInit() {
    try {
      this.user = await Auth.currentAuthenticatedUser();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error fetching user', error);
    }
  }

  logout() {
    this.authenticator.signOut();
    void this.router.navigate(['/login']);
  }
}
