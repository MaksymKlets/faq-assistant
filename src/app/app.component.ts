import {Component} from '@angular/core';
import {
  Dictionary,
  FaqItem
} from './faq-assistant/interfaces/faq-item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Dictionary<FaqItem> = {
    0: {
      title: 'How to get started with FORMA?',
      content: [3, 4, 5]
    },
    1: {
      title: 'How to register in FORM?',
      content: [6, 7, 8]
    },
    2: {
      title: 'Who is this application for?',
      content: [9, 10, 11]
    },
    3: {
      title: 'Trainer',
      content: 'You are Trainer'
    },
    4: {
      title: 'Client',
      content: 'You are Client'
    },
    5: {
      title: 'Investor',
      content: 'You are Investor'
    },
    6: {
      title: 'Trainer',
      content: 'Find the button in the upper left corner and follow the specified steps'
    },
    7: {
      title: 'Client',
      content: 'Find the button in the upper left corner and follow the specified steps'
    },
    8: {
      title: 'Investor',
      content: 'We can do it for you'
    },
    9: {
      title: 'Trainer',
      content: 'For everyone who does or wants to go in for sports. You can find persons and train them.'
    },
    10: {
      title: 'Client',
      content: 'For everyone who does or wants to go in for sports. You can find the best trainer.'
    },
    11: {
      title: 'Investor',
      content: 'For everyone who does or wants to go in for sports. You can find the best trainer.'
    }
  };
}
