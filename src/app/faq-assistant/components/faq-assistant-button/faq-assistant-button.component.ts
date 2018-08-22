import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import {CommunicationFaqAssistantService} from '../../services/communication-faq-assistant.service';

@Component({
  selector: 'app-faq-assistant-button',
  templateUrl: './faq-assistant-button.component.html',
  styleUrls: ['./faq-assistant-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqAssistantButtonComponent {

  visibilityContainer = true;
  visibilityCloseButton = false;

  constructor(private communicationFaqAssistantService: CommunicationFaqAssistantService) {
  }

  showHideFaqAssistantContainer(): void {
    this.visibilityContainer = !this.visibilityContainer;
    this.visibilityCloseButton = !this.visibilityCloseButton;
    this.communicationFaqAssistantService.sendVisibilityState(this.visibilityContainer);
  }
}
