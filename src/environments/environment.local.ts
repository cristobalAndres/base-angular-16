import { Environment } from './environment.type';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3002/api/v1',
  apiKYC:
    'https://cw-cl-user-data-develop.cencosud.net/user-data/user/KYC/enable',
  region: 'us-east-1',
  userPoolId: 'us-east-1_LHLYOUM85',
  userPoolWebClientId: '2lg5uhqnkvsnm2k5o4ll0sejlt',
  paymentDataBack:
    'https://cw-cl-payment-data-develop.cencosud.net/api-payment-data',
};
