import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import {CommunicationFaqAssistantService} from '../../services/communication-faq-assistant.service';

@Component({
  selector: 'app-faq-assistant-button',
  templateUrl: './faq-assistant-button.component.html',
  styleUrls: ['./faq-assistant-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqAssistantButtonComponent implements OnInit {

  visibilityContainer = true;
  visibilityCloseButton = false;

  constructor(private communicationFaqAssistantService: CommunicationFaqAssistantService) {
  }

  ngOnInit() {
  }

  showHideFaqAssistantContainer(): void {
    this.visibilityContainer = !this.visibilityContainer;
    this.visibilityCloseButton = !this.visibilityCloseButton;
    this.communicationFaqAssistantService.sendVisibilityState(this.visibilityContainer);
  }
}
