import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FaqItemListInterface} from '../../interfaces/faq-item.interface';
import {FaqItemListService} from '../../services/faq-item.service';
import {CommunicationFaqAssistantService} from '../../services/communication-faq-assistant.service';

@Component({
  selector: 'app-faq-assistant',
  templateUrl: './faq-assistant.component.html',
  styleUrls: ['./faq-assistant.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqAssistantComponent implements OnInit, OnDestroy {

  titleList: FaqItemListInterface[];
  items: FaqItemListInterface[][];
  showFinish = false;
  lastStep: boolean;
  showBack = false;
  answer: string | object;
  componentRef: any;
  subscription: Subscription;
  visibilityContainer: true;

  @Input() customClass: string;
  @Input() data: FaqItemListInterface[];
  @ViewChild('finalAnswer', {read: ViewContainerRef}) finalAnswerContent: ViewContainerRef;

  constructor(
    private itemManager: FaqItemListService,
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private communicationFaqAssistantService: CommunicationFaqAssistantService
  ) {
    this.subscription = this.communicationFaqAssistantService.receiveVisibilityState().subscribe(stateContainer => {
      this.visibilityContainer = stateContainer;
    });
  }

  ngOnInit() {
    this.visibilityContainer = true;
    this.getTitleList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createComponent(answer: any): void {
    this.finalAnswerContent.clear();
    const factory = this.resolver.resolveComponentFactory(answer);
    this.componentRef = this.finalAnswerContent.createComponent(factory);
  }

  getTitleList(): void {
    this.titleList = this.data;
    this.itemManager.setItem(this.data);
  }

  clearDataComponent(): void {
    if (this.finalAnswerContent) {
      this.finalAnswerContent.clear();
    }
    this.answer = '';
  }

  setTitle(title: FaqItemListInterface[], answer: string): void {
    if (Array.isArray(title)) {
      this.itemManager.setItem(title);
      this.titleList = title;
      this.showBack = true;
      this.answer = answer;
    } else {
      this.showFinish = true;
      this.showBack = true;
      this.lastStep = true;

      if (typeof answer === 'function') {
        this.createComponent(answer);
      } else {
        this.answer = answer;
      }
    }
  }

  back(): void {
    this.clearDataComponent();

    if (this.lastStep) {
      this.showFinish = false;
      this.lastStep = false;
    } else {
      this.itemManager.removeLastItem();
    }

    this.titleList = this.itemManager.getLastItem();
    this.items = this.itemManager.getItems();

    if (this.items.length === 1) {
      this.showBack = false;
    }
  }
}
