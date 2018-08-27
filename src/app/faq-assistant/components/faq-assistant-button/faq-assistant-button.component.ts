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

  isContainerVisible = false;

  constructor(private communicationFaqAssistantService: CommunicationFaqAssistantService) {
  }

  showHideFaqAssistantContainer(): void {
    this.isContainerVisible = !this.isContainerVisible;
    this.communicationFaqAssistantService.sendVisibilityState(this.isContainerVisible);
  }
}
