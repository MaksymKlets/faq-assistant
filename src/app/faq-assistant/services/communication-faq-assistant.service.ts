import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CommunicationFaqAssistantService {
  private subject = new Subject<any>();

  constructor() {
  }

  sendVisibilityState(state: boolean) {
    this.subject.next(state);
  }

  receiveVisibilityState(): Observable<any> {
    return this.subject.asObservable();
  }
}
