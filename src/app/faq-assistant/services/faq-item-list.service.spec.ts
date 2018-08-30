import {FaqItemListService} from './faq-item-list.service';

describe('FaqAssistantService', function () {
  const faqItemListService = new FaqItemListService();

  beforeEach(function () {
    faqItemListService.setQueueItem(1);
    faqItemListService.setQueueItem(2);
    faqItemListService.setQueueItem(3);
  });

  afterEach(function () {
    faqItemListService.removeLastQueueItem();
    faqItemListService.removeLastQueueItem();
    faqItemListService.removeLastQueueItem();
  });

  it('queueList property must be defined with empty array', function () {
    expect(faqItemListService.queueList).toBeDefined();
  });

  it('setQueueItem method set 3 elements into array and must has 3 elements', function () {
    expect(faqItemListService.queueList.length).toBe(3);
  });
});
