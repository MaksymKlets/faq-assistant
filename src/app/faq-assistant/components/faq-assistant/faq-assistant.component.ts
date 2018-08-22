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
import {FaqItemContentInterface} from '../../interfaces/faq-item.interface';
import {FaqItemListService} from '../../services/faq-item.service';
import {CommunicationFaqAssistantService} from '../../services/communication-faq-assistant.service';

@Component({
  selector: 'app-faq-assistant',
  templateUrl: './faq-assistant.component.html',
  styleUrls: ['./faq-assistant.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqAssistantComponent implements OnInit {

  titleList: FaqItemContentInterface[];
  items: FaqItemContentInterface[][];
  showFinish = false;
  lastStep: boolean;
  showBack = false;
  answer: string;
  componentRef: any;
  subscription: Subscription;
  visibilityContainer = true;

  @Input() customClass: string;
  @Input() data: FaqItemContentInterface[];
  @Input() params: any;
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
    this.getTitleList();
  }

  createComponent(answer: any, params: any): void {
    setTimeout(() => {
      this.finalAnswerContent.clear();
      const factory = this.resolver.resolveComponentFactory(answer);
      this.componentRef = this.finalAnswerContent.createComponent(factory);
      this.componentRef.instance.data = params;
    });
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

  setTitle(content: FaqItemContentInterface[]): void {
    if (Array.isArray(content)) {
      this.itemManager.setItem(content);
      this.titleList = content;
      this.showBack = true;
    } else {
      this.showFinish = true;
      this.showBack = true;
      this.lastStep = true;

      if (typeof content === 'function') {
        this.createComponent(content, this.params);
      } else if (typeof content === 'string') {
        this.answer = content;
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
