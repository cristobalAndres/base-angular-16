import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RefreshService {
  refresh = new BehaviorSubject<boolean>(false);
}
