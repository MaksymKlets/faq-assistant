import {FaqAssistantButtonComponent} from './faq-assistant-button.component';
import {CommunicationFaqAssistantService} from '../../services/faq-assistant.service';

describe('FaqAssistantButtonComponent', function () {
  it('should create instance of FaqAssistantButtonComponent', () => {
    expect(new FaqAssistantButtonComponent(new CommunicationFaqAssistantService())).toBeTruthy();
  });

  it('isContainerVisible should has "false" value', () => {
    const faqButton = new FaqAssistantButtonComponent(new CommunicationFaqAssistantService());

    expect(faqButton.isContainerVisible).toEqual(false);
  });

  it('showHideFaqAssistantContainer method should change isContainerVisible value to true', () => {
    const faqButton = new FaqAssistantButtonComponent(new CommunicationFaqAssistantService());
    faqButton.showHideFaqAssistantContainer();

    expect(faqButton.isContainerVisible).toEqual(true);
  });
});
