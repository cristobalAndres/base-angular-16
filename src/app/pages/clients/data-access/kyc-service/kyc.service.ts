import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environment';
import { throwError } from 'rxjs';
import { UpdateKycUserInformationDto } from './dtos';

@Injectable()
export class KycService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = environment.apiKYC;

  updateKycInformationUser(
    clientData: UpdateKycUserInformationDto,
    clientId: string,
  ) {
    if (!clientData || !clientId)
      return throwError(
        () => new Error('clientId and clientData are required'),
      );

    const body = {
      ...clientData,
      cognitoId: clientId,
    };

    return this.httpClient.post<void>(this.url, body);
  }
}
