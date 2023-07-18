import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment.dev';

@Injectable()
export class KycService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = environment.apiKYC;

  updateKycInformationUser(
    clientData: {
      name: string;
      lastName: string;
      birthDate: string;
      gender: string;
    },
    clientId: string,
  ) {
    if (!clientData || !clientId) {
      throw new Error('clientId or clientData is required');
    }
    const body = {
      ...clientData,
      cognitoId: clientId,
    };
    return this.httpClient.post<unknown>(this.url, body);
  }
}
