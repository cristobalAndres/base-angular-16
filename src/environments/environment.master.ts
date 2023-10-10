import { Environment } from './environment.type';

export const environment: Environment = {
  production: true,
  apiUrl:
    'https://brxfzqtdae.execute-api.us-east-1.amazonaws.com/prod/cw-cl-users-back-manager/api/v1',
  apiReportUrl:
    'https://bh8xeay84j.execute-api.us-east-1.amazonaws.com/prod/cw-cl-report-manager/api/v1',
  apiKYC: 'https://cw-cl-user-data-prod.cencosud.net/user-data/user/KYC/enable',
  region: 'us-east-1',
  userPoolId: 'us-east-1_p7wcOS7Rp',
  userPoolWebClientId: '7j5vavnab6892dae61h2opgo5h',
  paymentDataBack:
    'https://cw-cl-payment-data-prod.cencosud.net/api-payment-data',
};
