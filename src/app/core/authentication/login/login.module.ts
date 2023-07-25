import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { LoginComponent } from './login.component';
// import awsconfig from '../aws-exports';
import { environment } from '@environment';
import { Auth } from 'aws-amplify';

Auth.configure({
  region: environment.region,
  userPoolId: environment.userPoolId,
  userPoolWebClientId: environment.userPoolWebClientId,
});

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AmplifyAuthenticatorModule],
})
export class LoginModule {}
