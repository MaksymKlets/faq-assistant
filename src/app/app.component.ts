import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = [
    {
      id: 1, title: 'How to get started with FORMA?',
      item: [
        {id: 1, title: 'Trainer', answer: 'It is enough to write a letter to us'},
        {id: 2, title: 'Client', answer: 'It is enough to write a letter to us'},
        {id: 3, title: 'Investor', answer: 'It is enough to write a letter to us or set up a Skype call'}]
    },
    {
      id: 2, title: 'How to register in FORM?',
      item: [
        {id: 1, title: 'Trainer', answer: 'Find the button in the upper left corner and follow the specified steps'},
        {id: 2, title: 'Client', answer: 'Find the button in the upper left corner and follow the specified steps'},
        {id: 3, title: 'Investor', answer: 'We can do it for you'}]
    },
    {
      id: 3, title: 'Who is this application for?',
      item: [
        {id: 1, title: 'Trainer', answer: 'For everyone who does or wants to go in for sports. You can find persons and train them.'},
        {id: 2, title: 'Client', answer: 'For everyone who does or wants to go in for sports. You can find the best trainer.'},
        {
          id: 3,
          title: 'Investor',
          answer: 'For everyone who does or wants to go in for sports. You can find good proposals for cooperation.'
        }]
    }
  ];
}
