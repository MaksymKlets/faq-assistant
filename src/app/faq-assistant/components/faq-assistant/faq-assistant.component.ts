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
import {Dictionary, FaqItem} from '../../interfaces/faq-item.interface';

@Component({
  selector: 'app-faq-assistant',
  templateUrl: './faq-assistant.component.html',
  styleUrls: ['./faq-assistant.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqAssistantComponent implements OnInit {
  itemSortedList: any;
  stateFaqContainer: Subscription;
  isContainerVisible = false;
  isShowFinishContainer = false;
  isShowBackButton = false;
  isLastStep = false;
  answerMessage: string | object;
  componentRef: any;

  @Input() customClass: string;
  @Input() itemList: Dictionary<FaqItem>;
  @Input() params: any;
  @Input() displayItemList: number[];
  @ViewChild('finalAnswer', {read: ViewContainerRef}) finalAnswerContent: ViewContainerRef;

  constructor(
    private itemManager: FaqItemListService,
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private communicationFaqAssistantService: CommunicationFaqAssistantService
  ) {
  }

  ngOnInit() {
    this.itemSortedList = this.displayItemList;
    this.stateFaqContainer = this.communicationFaqAssistantService.receiveVisibilityState().subscribe(stateContainer => {
      this.isContainerVisible = stateContainer;
    });
  }

  private createComponent(component: any, inputComponent: any): void {
    setTimeout(() => {
      this.finalAnswerContent.clear();
      const factory = this.resolver.resolveComponentFactory(component);
      this.componentRef = this.finalAnswerContent.createComponent(factory);
      this.componentRef.instance.inputComponent = inputComponent;
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
      this.itemSortedList = item.content;
      this.itemManager.setQueueItem(index);
      this.isShowBackButton = true;
      return;
    }

    if (typeof item.content === 'function') {
      this.createComponent(item.content, this.params);
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
      this.itemManager.removeLastQueueItem();
      this.itemSortedList = this.itemManager.getLastQueueItem();

      if (this.itemSortedList[0] === undefined) {
        this.itemSortedList = this.displayItemList;
        this.isShowBackButton = false;
        return;
      } else if (Array.isArray(this.itemList[this.itemSortedList[0]].content)) {
        this.itemSortedList = this.itemList[this.itemSortedList].content;
      }
      return;
    }

    this.isShowFinishContainer = false;
    this.isLastStep = false;
  }
}
