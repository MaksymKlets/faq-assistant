import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CommunicationFaqAssistantService {
  private visibilityContainer = new Subject<any>();

  constructor() {
  }

  sendVisibilityState(state: boolean): void {
    this.visibilityContainer.next(state);
  }

  receiveVisibilityState(): Observable<any> {
    return this.visibilityContainer.asObservable();
  }
}
