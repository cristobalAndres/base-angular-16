import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
// import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify';


Auth.configure({
  region:'us-east-1',
  userPoolId:'us-east-1_LHLYOUM85',
  userPoolWebClientId:'2lg5uhqnkvsnm2k5o4ll0sejlt',
});

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AmplifyAuthenticatorModule
  ]
})
export class LoginModule { }
