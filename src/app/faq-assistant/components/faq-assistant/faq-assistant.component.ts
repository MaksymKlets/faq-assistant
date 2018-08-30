import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewEncapsulation
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CommunicationFaqAssistantService} from '../../services/communication-faq-assistant.service';
import {FaqItemListService} from '../../services/faq-item-list.service';
import {
  Dictionary,
  FaqItem
} from '../../interfaces/faq-item.interface';

@Component({
  selector: 'app-faq-assistant',
  templateUrl: './faq-assistant.component.html',
  styleUrls: ['./faq-assistant.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqAssistantComponent implements OnInit {
  displayItemList: number[];
  stateFaqContainer: Subscription;
  isContainerVisible = false;
  isShowFinishContainer = false;
  isShowBackButton = false;
  isLastStep = false;
  answerMessage: string | object;
  componentRef: any;

  @Input() customClass: string;
  @Input() itemList: Dictionary<FaqItem>;
  @Input() initialItemList: number[];
  @ViewChild('finalAnswer', {read: ViewContainerRef}) finalAnswerContent: ViewContainerRef;

  constructor(
    private faqItemListService: FaqItemListService,
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private communicationFaqAssistantService: CommunicationFaqAssistantService
  ) {
  }

  ngOnInit() {
    this.displayItemList = this.initialItemList;
    this.stateFaqContainer = this.communicationFaqAssistantService.receiveVisibilityState().subscribe(stateContainer => {
      this.isContainerVisible = stateContainer;
    });
  }

  private createComponent(component: any): void {
    setTimeout(() => {
      this.finalAnswerContent.clear();
      const factory = this.resolver.resolveComponentFactory(component);
      this.componentRef = this.finalAnswerContent.createComponent(factory);
    });
  }

  private clearResult(): void {
    if (this.finalAnswerContent) {
      this.finalAnswerContent.clear();
    }
    this.answerMessage = '';
  }

  setNextItem(item: FaqItem, index: number): void {
    if (Array.isArray(item.content)) {
      this.displayItemList = item.content;
      this.faqItemListService.setQueueItem(index);
      this.isShowBackButton = true;
      return;
    }

    if (typeof item.content === 'function') {
      this.createComponent(item.content);
    } else {
      this.answerMessage = item.content;
    }

    this.isShowFinishContainer = true;
    this.isShowBackButton = true;
    this.isLastStep = true;
  }

  setPreviousItem(): void {
    this.clearResult();

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
  }
}
