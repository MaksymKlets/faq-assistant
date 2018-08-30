import {FaqAssistantComponent} from './faq-assistant.component';
import {FaqItemListService} from '../../services/faq-item-list.service';
import {FaqAssistantService} from '../../services/faq-assistant.service';

describe('FaqAssistantComponent', function () {
  const faqItemListService = new (FaqItemListService);
  const faqAssistantService = new (FaqAssistantService);
  const faqAssistantComponent = new FaqAssistantComponent(faqItemListService, faqAssistantService);
  const itemWithContentArray = {
    content: [1, 2, 3]
  };
  const itemWithAnswer = {
    content: 'Hello'
  };

  it('should have following states', function () {
    expect(faqAssistantComponent.displayItemList).toBeUndefined();
    expect(faqAssistantComponent.stateFaqContainer).toBeUndefined();
    expect(faqAssistantComponent.answerMessage).toBeUndefined();
    expect(faqAssistantComponent.isContainerVisible).toBeFalsy();
    expect(faqAssistantComponent.isShowFinishContainer).toBeFalsy();
    expect(faqAssistantComponent.isShowBackButton).toBeFalsy();
    expect(faqAssistantComponent.isLastStep).toBeFalsy();
  });

  it('should has 3 elements in displayItemList property', function () {
    faqAssistantComponent.setNextItem(itemWithContentArray, 0);

    expect(faqAssistantComponent.displayItemList).toContain(1);
    expect(faqAssistantComponent.displayItemList).toContain(2);
    expect(faqAssistantComponent.displayItemList).toContain(3);
    expect(faqAssistantComponent.displayItemList.length).toBe(3);
    expect(faqAssistantComponent.isShowBackButton).toBeTruthy(true);
    expect(faqItemListService.removeLastQueueItem()).toBeUndefined();
    expect(faqItemListService.getLastQueueItem()).toBeNull();
  });

  it('setNextItem method should set answerMessage if typeof content === string', function () {
    expect(faqAssistantComponent.setNextItem(itemWithAnswer, 0)).toBeUndefined();
    expect(faqAssistantComponent.answerMessage).toBeDefined();
    expect(faqAssistantComponent.answerMessage).toMatch(itemWithAnswer.content);
    expect(faqAssistantComponent.answerMessage.length).toBe(itemWithAnswer.content.length);
    expect(faqAssistantComponent.isShowFinishContainer).toBeTruthy();
    expect(faqAssistantComponent.isShowBackButton).toBeTruthy();
    expect(faqAssistantComponent.isLastStep).toBeTruthy();
  });

  it('setPreviousItem method should set not empty array to displayItemList property if isn\'t last step', function () {
    expect(faqAssistantComponent.setPreviousItem()).toBeUndefined();
    expect(faqAssistantComponent.isLastStep).toBeFalsy();
    expect(faqAssistantComponent.displayItemList.length).toBeGreaterThan(0);
  });

  it('setPreviousItem method should set array with default value to displayItemList property if first step', function () {
    expect(faqAssistantComponent.isLastStep).toBeFalsy();
    expect(faqItemListService.getLastQueueItem()).toBeNull();
    expect(faqAssistantComponent.displayItemList.length).toBeGreaterThan(0);
  });
});
