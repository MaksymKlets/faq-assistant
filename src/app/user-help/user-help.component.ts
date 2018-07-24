import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import {isArray} from 'util';

@Component({
  selector: 'app-user-help',
  templateUrl: './user-help.component.html',
  styleUrls: ['./user-help.component.css']
})
export class UserHelpComponent implements OnInit {

  questions: Object[];
  initialStep: boolean;
  preserveAnswer: Object[];
  showFinish: boolean;
  showPrev: boolean;
  showNext: boolean;

  getQuestions(): void {
    this.questions = this.questionStep.getQuestions();
  }

  setQuestion(question): void {
    this.preserveAnswer = question;
  }

  next(): void {
    if (isArray(this.preserveAnswer)) {
      this.showPrev = true;
      this.questions = this.preserveAnswer;
    } else {
      this.showFinish = true;
      this.showPrev = false;
      this.showNext = false;
    }
  }

  prev(): void {
    //todo implement previous step
  }

  constructor(private questionStep: UserServiceService) { }

  ngOnInit() {
    this.getQuestions();
    this.initialStep = false;
    this.showFinish = false;
    this.showPrev = false;
    this.showNext = true;
  }

}
