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
  titleSortedList: Dictionary<FaqItem>;
  stateFaqContainer: Subscription;
  isContainerVisible = false;
  isShowFinish = false;
  isShowBack = false;
  isLastStep = false;
  answerMessage: string | object;
  indexTitleSortedList: string[];
  componentRef: any;

  @Input() customClass: string;
  @Input() titleList: Dictionary<FaqItem>;
  @Input() params: any;
  @Input() countTitle: number;
  @ViewChild('finalAnswer', {read: ViewContainerRef}) finalAnswerContent: ViewContainerRef;

  ngOnInit() {
    this.getTitleList();
    this.stateFaqContainer = this.communicationFaqAssistantService.receiveVisibilityState().subscribe(stateContainer => {
      this.isContainerVisible = stateContainer;
    });
  }

  constructor(
    private itemManager: FaqItemListService,
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private communicationFaqAssistantService: CommunicationFaqAssistantService
  ) {
  }

  private createComponent(component: any, inputComponent: any): void {
    setTimeout(() => {
      this.finalAnswerContent.clear();
      const factory = this.resolver.resolveComponentFactory(component);
      this.componentRef = this.finalAnswerContent.createComponent(factory);
      this.componentRef.instance.inputComponent = inputComponent;
    });
  }

  private setInitialStateTitleList(countTitle: number): void {
    const titleSortedList = {};
    for (const title in this.titleList) {
      if (parseInt(title, null) < countTitle) {
        titleSortedList[title] = this.titleList[title];
      }
    }

    this.titleSortedList = titleSortedList;
    this.indexTitleSortedList = Object.keys(this.titleSortedList);
  }

  private getTitleList(): void {
    this.setInitialStateTitleList(this.countTitle);
    this.itemManager.setInitialStateData(this.titleList);
    this.itemManager.setQueueItem(this.titleSortedList);
  }

  private clearDataComponent(): void {
    if (this.finalAnswerContent) {
      this.finalAnswerContent.clear();
    }
    this.answerMessage = '';
  }

  private setTitle(item: FaqItem): void {
    if (Array.isArray(item.content)) {
      this.titleSortedList = this.itemManager.getTitleById(item);
      this.indexTitleSortedList = Object.keys(this.titleSortedList);
      this.itemManager.setQueueItem(item);
      this.isShowBack = true;
    } else if (typeof item.content === 'function') {
      this.createComponent(item.content, this.params);
      this.isShowFinish = true;
      this.isShowBack = true;
      this.isLastStep = true;
    } else {
      this.answerMessage = item.content;
      this.isShowFinish = true;
      this.isShowBack = true;
      this.isLastStep = true;
    }
  }

  private previousStep(): void {
    this.clearDataComponent();
    const queueList = this.itemManager.getQueueList();

    if (this.isLastStep) {
      const lastItem: object = this.itemManager.getLastQueueItem();

      if (queueList.length === 1) {
        this.setInitialStateTitleList(this.countTitle);
      } else {
        this.titleSortedList = this.itemManager.getTitleById(lastItem);
        this.indexTitleSortedList = Object.keys(this.titleSortedList);
      }

      this.isShowFinish = false;
      this.isLastStep = false;
    } else {
      this.itemManager.removeLastQueueItem();
      const lastItem: object = this.itemManager.getLastQueueItem();

      if (queueList.length === 1) {
        this.setInitialStateTitleList(this.countTitle);
      } else {
        this.titleSortedList = this.itemManager.getTitleById(lastItem);
        this.indexTitleSortedList = Object.keys(this.titleSortedList);
      }
    }

    if (queueList.length === 1) {
      this.isShowBack = false;
    }
  }
}
