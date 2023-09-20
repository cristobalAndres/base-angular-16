import { Environment } from './environment.type';

export const environment: Environment = {
  production: false,
  apiUrl:
    'https://67fr6ynj1j.execute-api.us-east-1.amazonaws.com/qa/cw-cl-users-back-manager/api/v1',
  apiReportUrl: '',
  apiKYC: 'https://cw-cl-user-data-qa.cencosud.net/user-data/user/KYC/enable',
  region: 'us-east-1',
  userPoolId: 'us-east-1_LHLYOUM85',
  userPoolWebClientId: '2lg5uhqnkvsnm2k5o4ll0sejlt',
  paymentDataBack:
    'https://cw-cl-payment-data-qa.cencosud.net/api-payment-data',
};
