import {FaqAssistantButtonComponent} from './faq-assistant-button.component';
import {FaqAssistantService} from '../../services/faq-assistant.service';

describe('FaqAssistantButtonComponent', function () {
  it('should create instance of FaqAssistantButtonComponent', () => {
    expect(new FaqAssistantButtonComponent(new FaqAssistantService())).toBeTruthy();
  });

  it('isContainerVisible should has "false" value', () => {
    const faqButton = new FaqAssistantButtonComponent(new FaqAssistantService());

    expect(faqButton.isContainerVisible).toEqual(false);
  });

  it('showHideFaqAssistantContainer method should change isContainerVisible value to true', () => {
    const faqButton = new FaqAssistantButtonComponent(new FaqAssistantService());
    faqButton.toggleFaqAssistantContainer();

    expect(faqButton.isContainerVisible).toEqual(true);
  });
});
