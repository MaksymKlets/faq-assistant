import { Injectable } from '@angular/core';
import { Questions } from './mock-question';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  getQuestions(): Object[] {
    return Questions;
  }

  constructor() { }
}
