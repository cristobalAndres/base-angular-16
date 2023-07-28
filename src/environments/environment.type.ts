export type Environment = Readonly<{
  production: boolean;
  apiUrl: string;
  apiKYC: string;
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
  paymentDataBack: string;
}>;
