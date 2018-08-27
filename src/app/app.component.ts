import {Component} from '@angular/core';
import {FaqItemContentInterface, FaqObject} from './faq-assistant/interfaces/faq-item.interface';
import {EntryComponent} from './faq-assistant/components/entry/entry.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: FaqItemContentInterface<FaqObject> = {
    0: {
      title: 'Zero item',
      content: EntryComponent
    },
    1: {
      title: 'First item',
      content: [0, 2]
    },
    2: {
      title: 'Second item',
      content: 'Here answer 2'
    },
    3: {
      title: 'Third item',
      content: 'Here answer 3'
    }
  };
}
