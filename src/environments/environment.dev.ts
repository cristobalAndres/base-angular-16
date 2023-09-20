import { Environment } from './environment.type';

export const environment: Environment = {
  production: false,
  apiUrl:
    'https://zuhimnhv2m.execute-api.us-east-1.amazonaws.com/dev/cw-cl-users-back-manager/api/v1',
  apiReportUrl:
    'https://zuhimnhv2m.execute-api.us-east-1.amazonaws.com/dev/cw-cl-report-manager/api/v1',
  apiKYC:
    'https://cw-cl-user-data-develop.cencosud.net/user-data/user/KYC/enable',
  region: 'us-east-1',
  userPoolId: 'us-east-1_LHLYOUM85',
  userPoolWebClientId: '2lg5uhqnkvsnm2k5o4ll0sejlt',
  paymentDataBack:
    'https://cw-cl-payment-data-develop.cencosud.net/api-payment-data',
};
