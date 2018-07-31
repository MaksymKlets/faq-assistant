import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-final-answer',
  templateUrl: './final-answer.component.html',
  styleUrls: ['./final-answer.component.scss']
})
export class FinalAnswerComponent implements OnInit {
  @Input() data: string;

  ngOnInit() {
    this.data = this.data;
  }

}
