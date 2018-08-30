import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FaqAssistantService {
  private visibilityContainer = new Subject<boolean>();

  constructor() {
  }

  setVisibilityState(state: boolean): void {
    this.visibilityContainer.next(state);
  }

  getVisibilityState(): Observable<boolean> {
    return this.visibilityContainer.asObservable();
  }
}
