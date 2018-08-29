import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CommunicationFaqAssistantService {
  private visibilityContainer = new Subject<boolean>();

  constructor() {
  }

  sendVisibilityState(state: boolean): void {
    this.visibilityContainer.next(state);
  }

  receiveVisibilityState(): Observable<boolean> {
    return this.visibilityContainer.asObservable();
  }
}
