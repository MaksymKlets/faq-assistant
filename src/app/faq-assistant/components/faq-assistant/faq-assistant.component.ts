import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FaqAssistantService} from '../../services/faq-assistant.service';
import {FaqItemListService} from '../../services/faq-item-list.service';
import {Dictionary, FaqItem} from '../../interfaces/faq-item.interface';

@Component({
  selector: 'app-faq-assistant',
  templateUrl: './faq-assistant.component.html',
  styleUrls: ['./faq-assistant.component.scss']
})
export class FaqAssistantComponent implements OnInit {
  displayItemList: number[];
  stateFaqContainer: Subscription;
  isContainerVisible = false;
  isShowFinishContainer = false;
  isShowBackButton = false;
  isLastStep = false;
  answerMessage: string;

  @Input() customClass: string;
  @Input() itemList: Dictionary<FaqItem>;
  @Input() initialItemList: number[];

  constructor(
    private faqItemListService: FaqItemListService,
    private faqAssistantService: FaqAssistantService
  ) {
  }

  ngOnInit() {
    if (!this.initialItemList) {
      this.displayItemList = [];
    } else {
      this.displayItemList = this.initialItemList;
    }

    this.stateFaqContainer = this.faqAssistantService.getVisibilityState().subscribe(stateContainer => {
      this.isContainerVisible = stateContainer;
    });
  }

  setNextItem(item: FaqItem, index: number): void {
    if (Array.isArray(item.content)) {
      this.displayItemList = item.content;
      this.faqItemListService.setQueueItem(index);
      this.isShowBackButton = true;
      return;
    }

    if (typeof item.content === 'string') {
      this.answerMessage = item.content;
    }

    this.isShowFinishContainer = true;
    this.isShowBackButton = true;
    this.isLastStep = true;
  }

  setPreviousItem(): void {
    if (!this.isLastStep) {
      this.faqItemListService.removeLastQueueItem();
      const prevItemIndex = this.faqItemListService.getLastQueueItem();

      if (prevItemIndex === null) {
        this.displayItemList = this.initialItemList;
        this.isShowBackButton = false;
        return;
      }

      if (Array.isArray(this.itemList[prevItemIndex].content)) {
        const contentItem = this.itemList[prevItemIndex].content as number[];
        this.displayItemList = contentItem;
      }
      return;
    }

    this.isShowFinishContainer = false;
    this.isLastStep = false;
    this.answerMessage = '';
  }
}
