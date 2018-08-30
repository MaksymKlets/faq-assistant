import {Component} from '@angular/core';
import {FaqAssistantService} from '../../services/faq-assistant.service';

@Component({
  selector: 'app-faq-assistant-button',
  templateUrl: './faq-assistant-button.component.html',
  styleUrls: ['./faq-assistant-button.component.scss']
})
export class FaqAssistantButtonComponent {

  isContainerVisible = false;

  constructor(private faqAssistantService: FaqAssistantService) {
  }

  toggleFaqAssistantContainer(): void {
    this.isContainerVisible = !this.isContainerVisible;
    this.faqAssistantService.setVisibilityState(this.isContainerVisible);
  }
}
